package za.co.ajk.incidentman.messaging.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import za.co.ajk.incidentman.messaging.MessageSender;
import za.co.ajk.incidentman.messaging.OutboundMessage;

@Service
@EnableBinding(Source.class)
public class MessageSenderImpl implements MessageSender {
    
    @Autowired
    private MessageChannel output;
    
    @Override
    public void sendMessage(Integer eventType){
        OutboundMessage obm = new OutboundMessage();
        obm.setEventType("EventType : "+eventType);
        obm.setPayload("This is the big payload");
        obm.setSourceDestination("SystemGateway");
        obm.setTargetDestination("EventModule");
        
        output.send(MessageBuilder.withPayload(obm).build());
    }
    
}
