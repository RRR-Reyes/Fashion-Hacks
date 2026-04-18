package com.satellite.fashion.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.satellite.fashion.dto.AnalyzeResponse;
import com.satellite.fashion.exception.ExternalApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAIService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.model}")
    private String model;

    /**
     * Sends the NASA image URL to GPT with a structured prompt.
     * Asks the model to return ONLY a JSON object with colors, textures, and vibe.
     *
     * @param imageUrl the NASA APOD or EONET image URL
     * @return AnalyzeResponse with 3 hex colors, 2 textures, and a vibe string
     */
    public AnalyzeResponse analyzeImage(String imageUrl) {
        log.debug("Sending image to OpenAI for analysis: {}", imageUrl);

        String prompt = buildPrompt(imageUrl);
        Map<String, Object> requestBody = buildRequestBody(prompt);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    apiUrl, HttpMethod.POST, entity, String.class
            );

            log.debug("OpenAI raw response: {}", response.getBody());
            return parseOpenAIResponse(response.getBody());

        } catch (Exception e) {
            log.error("OpenAI API call failed", e);
            throw new ExternalApiException("Failed to analyze image with OpenAI: " + e.getMessage());
        }
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    private String buildPrompt(String imageUrl) {
        return """
                You are a fashion stylist AI. Analyze this image and extract style attributes.
                
                Image URL: %s
                
                Respond ONLY with a valid JSON object in this exact format, no explanation:
                {
                  "colors": ["#hexcode1", "#hexcode2", "#hexcode3"],
                  "textures": ["texture1", "texture2"],
                  "vibe": "short mood/aesthetic description (max 8 words)"
                }
                
                Rules:
                - colors: exactly 3 dominant HEX codes from the image palette
                - textures: exactly 2 fabric/material descriptors (e.g. "matte", "iridescent", "linen", "velvet")
                - vibe: a short aesthetic phrase useful for searching fashion (e.g. "cosmic warm desert dusk")
                """.formatted(imageUrl);
    }

    private Map<String, Object> buildRequestBody(String prompt) {
        return Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.7
        );
    }

    private AnalyzeResponse parseOpenAIResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);

            // Navigate: choices[0].message.content
            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            log.debug("OpenAI parsed content: {}", content);

            // Parse the inner JSON string that GPT returned
            JsonNode styleNode = objectMapper.readTree(content);

            List<String> colors = objectMapper.convertValue(
                    styleNode.get("colors"),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, String.class)
            );

            List<String> textures = objectMapper.convertValue(
                    styleNode.get("textures"),
                    objectMapper.getTypeFactory().constructCollectionType(List.class, String.class)
            );

            String vibe = styleNode.get("vibe").asText();

            return AnalyzeResponse.builder()
                    .colors(colors)
                    .textures(textures)
                    .vibe(vibe)
                    .build();

        } catch (Exception e) {
            log.error("Failed to parse OpenAI response", e);
            throw new ExternalApiException("Could not parse OpenAI response: " + e.getMessage());
        }
    }
}
