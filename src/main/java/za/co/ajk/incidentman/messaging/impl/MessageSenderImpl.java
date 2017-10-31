package za.co.ajk.incidentman.messaging.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import za.co.ajk.incidentman.messaging.MessageSender;
import za.co.ajk.incidentman.messaging.OutboundMessage;
import za.co.ajk.incidentman.messaging.ProducerChannels;

@Service
@EnableBinding(Source.class)
public class MessageSenderImpl implements MessageSender {

//    @Autowired
//    @Qualifier(ProducerChannels.EVENT_DESTINATION)
    private MessageChannel eventDestinationChannel;
    
//    @Autowired
//    @Qualifier(ProducerChannels.BROADCASTS)
    private MessageChannel broadcastsChannel;
    
    @Autowired
    MessageSenderImpl(ProducerChannels producerChannels){
        this.eventDestinationChannel = producerChannels.eventDestinationChannel();
        this.broadcastsChannel = producerChannels.broadcastsChannel();
    }
    
    @Override
    public void sendMessage(Integer eventType){
        OutboundMessage obm = new OutboundMessage();
        obm.setEventType("EventType : "+eventType);
        obm.setPayload("This is the big payload");
        obm.setSourceDestination("SystemGateway");
        obm.setTargetDestination("EventModule");
        
        eventDestinationChannel.send(MessageBuilder.withPayload(obm).build());
        
        OutboundMessage broadmes = new OutboundMessage();
        broadmes.setEventType("broadmes EventType : "+eventType);
        broadmes.setPayload("This is the big payload");
        broadmes.setSourceDestination("SystemGateway");
        broadmes.setTargetDestination("EventModule");

        broadcastsChannel.send(MessageBuilder.withPayload(broadmes).build());
    }
    
}
