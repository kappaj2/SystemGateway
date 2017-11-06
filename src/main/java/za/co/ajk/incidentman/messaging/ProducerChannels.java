package za.co.ajk.incidentman.messaging;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface ProducerChannels {
    
    String EVENT_DESTINATION = "event-input";
    String BILLING_DESTINATION = "billing-input";
    String BROADCASTS = "broadcasts";
    
    @Output(EVENT_DESTINATION)
    @Qualifier(ProducerChannels.EVENT_DESTINATION)
    MessageChannel eventDestinationChannel();
    
    @Output(BILLING_DESTINATION)
    @Qualifier(ProducerChannels.BILLING_DESTINATION)
    MessageChannel billingDestinationChannel();
    
    @Output(BROADCASTS)
    @Qualifier(ProducerChannels.BROADCASTS)
    MessageChannel broadcastsChannel();
}
