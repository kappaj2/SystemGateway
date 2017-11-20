package za.co.ajk.incidentman.web.rest.clients;

import org.springframework.web.bind.annotation.RestController;


//  http://www.baeldung.com/rest-template

@RestController
public class TestCall {

//    private RestTemplate restTemplate;
//
//    public TestCall(RestTemplate restTemplate) {
//        this.restTemplate = restTemplate;
//    }
//
//
//    @RequestMapping(method = RequestMethod.GET, value = "/names")
//    public Collection<String> names() {
//
//        ParameterizedTypeReference<List<Reservation>> ptr =
//            new ParameterizedTypeReference<List<Reservation>>() {
//            };
//
//        ResponseEntity<List<Reservation>> responseEntity =
//            this.restTemplate.exchange("http://EVENTMODULE/names",
//                HttpMethod.GET,
//                null,
//                ptr
//            );
//
//        //  As DTO's
//        List<String> names = responseEntity
//            .getBody()
//            .stream()
//            .map(Reservation::getReservationName)
//            .collect(Collectors.toList());
//
//
//        //  Or using plain json returned
//
//        ResponseEntity<String> respJson = restTemplate
//            .getForEntity("http://EVENTMODULE/names", String.class);
//
//
//        return names;
//    }
}


