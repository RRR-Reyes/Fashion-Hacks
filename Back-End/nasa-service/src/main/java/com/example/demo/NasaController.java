package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/nasa")
public class NasaController {

    private final String nasaKey = "DEMO_KEY"; 

    // Today's Image: http://localhost:8080/nasa/image
    @GetMapping("/image")
    public Map<String, Object> getNasaImage() {
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, Map.class);
    }

    // Historical Image: http://localhost:8080/nasa/history?date=YYYY-MM-DD
    @GetMapping("/history") 
    public Map<String, Object> getHistoricalImage(@RequestParam String date) {
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey + "&date=" + date;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, Map.class);
    }
}