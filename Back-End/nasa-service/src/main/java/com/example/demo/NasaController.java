package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/nasa")
@CrossOrigin(origins = "*") 
public class NasaController {

    @SuppressWarnings("unchecked")
    @GetMapping("/image")
    public Map<String, String> getNasaImage() {
        
        String apiKey = System.getenv("NASA_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            apiKey = "DEMO_KEY"; 
        }
        
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> nasaResponse = restTemplate.getForObject(url, Map.class);

        Map<String, String> frontendResult = new HashMap<>();
        
        if (nasaResponse != null) {
            frontendResult.put("title", (String) nasaResponse.get("title"));
            frontendResult.put("imageUrl", (String) nasaResponse.get("url"));
            frontendResult.put("description", (String) nasaResponse.get("explanation"));
        }

        return frontendResult;
    }
}