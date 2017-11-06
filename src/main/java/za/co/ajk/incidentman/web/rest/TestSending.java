package za.co.ajk.incidentman.web.rest;

import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import za.co.ajk.incidentman.messaging.MessageSender;

@RestController
public class TestSending {
    private final Logger log = LoggerFactory.getLogger(TestSending.class);
    
    @Autowired
    private MessageSender messageSender;
    
    @RequestMapping("/send/{nr}")
    public void submitMessage(@PathVariable("nr") Integer nr){
        log.info("Sending "+nr+"  message(s)!!");
        IntStream.range(0, nr).forEach(ii -> messageSender.sendMessage(ii));
    }
}
