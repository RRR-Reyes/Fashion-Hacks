package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/nasa")
@CrossOrigin(origins = "*") 
public class NasaController {

    @GetMapping("/image") // <--- THIS IS THE CRITICAL FIX
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
            // --- EDGE CASE HARDENING START ---
            String mediaType = (String) nasaResponse.get("media_type");
            String finalImageUrl = (String) nasaResponse.get("url");

            // If NASA returns a video, use a high-res backup image of the Pillars of Creation
            if ("video".equalsIgnoreCase(mediaType)) {
                finalImageUrl = "https://images-assets.nasa.gov/image/PIA23645/PIA23645~large.jpg";
                frontendResult.put("title", "Pillars of Creation (Fallback)");
                frontendResult.put("description", "NASA posted a video today, so we've provided this iconic fallback image of the Pillars of Creation for your outfit inspiration.");
            } else {
                frontendResult.put("title", (String) nasaResponse.get("title"));
                frontendResult.put("description", (String) nasaResponse.get("explanation"));
            }
            // --- EDGE CASE HARDENING END ---

            frontendResult.put("imageUrl", finalImageUrl);
        }

        return frontendResult;
    }
}