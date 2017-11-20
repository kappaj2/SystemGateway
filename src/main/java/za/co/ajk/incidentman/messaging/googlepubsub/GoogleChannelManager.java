//package za.co.ajk.incidentman.messaging.googlepubsub;
//
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.cloud.gcp.pubsub.core.PubSubOperations;
//import org.springframework.cloud.gcp.pubsub.support.GcpHeaders;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.integration.annotation.MessagingGateway;
//import org.springframework.integration.annotation.ServiceActivator;
//import org.springframework.integration.channel.DirectChannel;
//import org.springframework.integration.gcp.pubsub.AckMode;
//import org.springframework.integration.gcp.pubsub.inbound.PubSubInboundChannelAdapter;
//import org.springframework.integration.gcp.pubsub.outbound.PubSubMessageHandler;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.MessageHandler;
//
//import com.google.cloud.pubsub.v1.AckReplyConsumer;
//
//@Configuration
//public class GoogleChannelManager {
//
//
//    @Bean
//    public PubSubInboundChannelAdapter messageChannelAdapter(
//        @Qualifier("pubsubInputChannel") MessageChannel inputChannel,
//        PubSubOperations pubSubTemplate) {
//        PubSubInboundChannelAdapter adapter =
//            new PubSubInboundChannelAdapter(pubSubTemplate, "testSubscription");
//        adapter.setOutputChannel(inputChannel);
//        adapter.setAckMode(AckMode.MANUAL);
//
//        return adapter;
//    }
//
//    @Bean
//    public MessageChannel pubsubInputChannel() {
//        return new DirectChannel();
//    }
//
//    @Bean
//    @ServiceActivator(inputChannel = "pubsubInputChannel")
//    public MessageHandler messageReceiver() {
//        return message -> {
//           // LOGGER.info("Message arrived! Payload: " + message.getPayload());
//            AckReplyConsumer consumer =
//                (AckReplyConsumer) message.getHeaders().get(GcpHeaders.ACKNOWLEDGEMENT);
//            consumer.ack();
//        };
//    }
//
//    @Bean
//    @ServiceActivator(inputChannel = "pubsubOutputChannel")
//    public MessageHandler messageSender(PubSubOperations pubsubTemplate) {
//        return new PubSubMessageHandler(pubsubTemplate, "testTopic");
//    }
//
//    @MessagingGateway(defaultRequestChannel = "pubsubOutputChannel")
//    public interface PubsubOutboundGateway {
//        void sendToPubsub(String text);
//    }
//}
