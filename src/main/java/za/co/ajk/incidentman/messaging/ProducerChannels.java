package za.co.ajk.incidentman.messaging;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.context.annotation.Primary;
import org.springframework.messaging.MessageChannel;

public interface ProducerChannels {
    
    String EVENT_DESTINATION = "event-input";
    String BROADCASTS = "broadcasts";
    
    @Output(EVENT_DESTINATION)
    @Qualifier(ProducerChannels.EVENT_DESTINATION)
    MessageChannel eventDestinationChannel();
    
    @Output(BROADCASTS)
    @Qualifier(ProducerChannels.BROADCASTS)
    MessageChannel broadcastsChannel();
}
