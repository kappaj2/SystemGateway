package za.co.ajk.incidentman.web.rest;

import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import za.co.ajk.incidentman.messaging.MessageSender;
import za.co.ajk.incidentman.messaging.OutboundMessage;
import za.co.ajk.incidentman.messaging.googlepubsub.GoogleChannelManager;
//import za.co.ajk.incidentman.messaging.googlepubsub.GoogleChannelManager;


@RestController
public class TestSending {
    private final Logger log = LoggerFactory.getLogger(TestSending.class);
    
    @Autowired
    private MessageSender messageSender;
    
    @Autowired
    private GoogleChannelManager.PubsubOutboundGateway messagingGateway;
    
    @RequestMapping("/send/{nr}")
    public void submitMessage(@PathVariable("nr") Integer nr){
        log.info("Sending "+nr+"  message(s)!!");
        IntStream.range(0, nr).forEach(ii -> messageSender.sendMessage(ii));
    }
    
    @GetMapping("/testGoogleSubmit/{message}/{cnt}")
    public void testSendingToGooglePubSub(final @PathVariable  String message,  final @PathVariable Integer cnt) throws Exception{
       // IntStream.range(0, cnt).forEach(ii -> messagingGateway.sendToPubsub(message.concat(new Date()+""+ii)));
    
        OutboundMessage om = new OutboundMessage();
        om.setEventType("EventType1");
        om.setSourceDestination("Source dest");
        om.setTargetDestination("Target dest");
        om.setPayload(message);
    
        ObjectMapper mapper = new ObjectMapper();
        String payload = mapper.writeValueAsString(om);
        messagingGateway.sendToPubsub(payload);
    }
    
}
