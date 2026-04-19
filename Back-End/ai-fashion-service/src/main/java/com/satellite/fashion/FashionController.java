package com.satellite.fashion;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fashion")
@CrossOrigin(origins = "*")
public class FashionController {

    @PostMapping("/generate")
    public Map<String, Object> getFashionMatch(@RequestBody Map<String, String> nasaData) {
        String description = nasaData.get("description");
        String groqKey = System.getenv("GROQ_API_KEY");
        String unsplashKey = System.getenv("UNSPLASH_KEY");

        // Log to terminal to help us debug
        System.out.println("--- AI Request Received ---");
        System.out.println("Unsplash Key Status: " + (unsplashKey != null ? "READY" : "MISSING"));

        Map<String, Object> result = new HashMap<>();
        
        // 1. Set default fallbacks in case the API calls fail
        result.put("vibeDescription", "A cosmic look inspired by: " + (description != null ? description : "The Stars"));
        result.put("fashionImage", "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1000");

        try {
            // 2. Build the search query
            String vibes = "futuristic streetwear fashion space aesthetic";
            String unsplashUrl = "https://api.unsplash.com/photos/random?query=" + vibes + "&client_id=" + unsplashKey;
            
            // 3. Attempt the API call
            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> unsplashResponse = restTemplate.getForObject(unsplashUrl, Map.class);

            if (unsplashResponse != null && unsplashResponse.containsKey("urls")) {
                Map<String, String> urls = (Map<String, String>) unsplashResponse.get("urls");
                result.put("fashionImage", urls.get("regular"));
                System.out.println("✅ Successfully fetched fashion image.");
            }
        } catch (Exception e) {
            System.out.println("❌ Unsplash API Error: " + e.getMessage());
            // The code continues because we have the fallback image from Step 1
        }

        return result;
    }
}