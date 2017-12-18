package za.co.ajk.incidentman.messaging.googlepubsub;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.gcp.pubsub.core.PubSubOperations;
import org.springframework.cloud.gcp.pubsub.support.GcpHeaders;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.MessagingGateway;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.gcp.pubsub.AckMode;
import org.springframework.integration.gcp.pubsub.inbound.PubSubInboundChannelAdapter;
import org.springframework.integration.gcp.pubsub.outbound.PubSubMessageHandler;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.pubsub.v1.AckReplyConsumer;
import za.co.ajk.incidentman.messaging.OutboundMessage;


@Component
@Configuration
public class GoogleChannelManager {
    
    private final Logger log = LoggerFactory.getLogger(getClass());
    
    @Bean
    public PubSubInboundChannelAdapter messageChannelAdapter(
        @Qualifier("pubsubInputChannel") MessageChannel inputChannel,
        PubSubOperations pubSubTemplate) {
        PubSubInboundChannelAdapter adapter =
            new PubSubInboundChannelAdapter(pubSubTemplate, "testSubscription");
        adapter.setOutputChannel(inputChannel);
        adapter.setAckMode(AckMode.MANUAL);
        
        //adapter.setMessageConverter(new MappingJackson2MessageConverter());
        
        return adapter;
    }
    
    @Bean
    public MessageChannel pubsubInputChannel() {
        return new DirectChannel();
    }
    
    @Bean
    @ServiceActivator(inputChannel = "pubsubInputChannel")
    public MessageHandler messageReceiver()  {
        return message -> {
//            Message mes = message;
//            mes.getHeaders();
            
            
            // LOGGER.info("Message arrived! Payload: " + message.getPayload());
            
            ObjectMapper mapper = new ObjectMapper();
            try {
                OutboundMessage om = mapper.readValue(message.getPayload().toString(), OutboundMessage.class);
                log.info("Received message : "+om.toString());
            }catch(IOException io){
                io.printStackTrace();
            }
            
            System.out.println("Class type of message is : " + message.getPayload().getClass());
            
            // GenericMessage om = (GenericMessage)message.getPayload();
            
            System.out.println("*************************** >>>>> Message received : " + message.getPayload());
            AckReplyConsumer consumer =
                (AckReplyConsumer) message.getHeaders().get(GcpHeaders.ACKNOWLEDGEMENT);
            consumer.ack();
        };
    }
    
    @Bean
    @ServiceActivator(inputChannel = "pubsubOutputChannel")
    public MessageHandler messageSender(PubSubOperations pubsubTemplate) {
        return new PubSubMessageHandler(pubsubTemplate, "testTopic");
    }
    
    @MessagingGateway(defaultRequestChannel = "pubsubOutputChannel")
    public interface PubsubOutboundGateway {
        
        void sendToPubsub(String text);
    }
    
}
