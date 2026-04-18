package com.satellite.fashion.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.satellite.fashion.dto.AnalyzeResponse;
import com.satellite.fashion.dto.FashionResponse;
import com.satellite.fashion.dto.OutfitImage;
import com.satellite.fashion.exception.ExternalApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UnsplashService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${unsplash.api.key}")
    private String apiKey;

    @Value("${unsplash.api.url}")
    private String apiUrl;

    @Value("${unsplash.results.limit}")
    private int resultsLimit;

    /**
     * Queries Unsplash for fashion photos using the vibe and textures
     * extracted by OpenAI. Returns 3–5 matching outfit images.
     *
     * @param analysis the AnalyzeResponse from OpenAI (colors, textures, vibe)
     * @return FashionResponse with outfit images plus echoed style attributes
     */
    public FashionResponse searchOutfits(AnalyzeResponse analysis) {
        String searchQuery = buildSearchQuery(analysis);
        log.debug("Searching Unsplash with query: {}", searchQuery);

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/search/photos")
                .queryParam("query", searchQuery)
                .queryParam("per_page", resultsLimit)
                .queryParam("orientation", "portrait")  // portrait is best for outfit photos
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + apiKey);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url, HttpMethod.GET, entity, String.class
            );

            log.debug("Unsplash raw response received");
            List<OutfitImage> outfits = parseUnsplashResponse(response.getBody());

            return FashionResponse.builder()
                    .outfits(outfits)
                    .vibe(analysis.getVibe())
                    .colors(analysis.getColors())
                    .build();

        } catch (Exception e) {
            log.error("Unsplash API call failed", e);
            throw new ExternalApiException("Failed to fetch outfits from Unsplash: " + e.getMessage());
        }
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    /**
     * Builds a human-readable search query from the AI analysis.
     * Example output: "fashion outfit matte velvet cosmic warm desert dusk"
     */
    private String buildSearchQuery(AnalyzeResponse analysis) {
        StringBuilder query = new StringBuilder("fashion outfit ");

        if (analysis.getTextures() != null) {
            query.append(String.join(" ", analysis.getTextures())).append(" ");
        }

        if (analysis.getVibe() != null) {
            query.append(analysis.getVibe());
        }

        return query.toString().trim();
    }

    private List<OutfitImage> parseUnsplashResponse(String rawResponse) {
        List<OutfitImage> outfits = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            JsonNode results = root.path("results");

            for (JsonNode photo : results) {
                OutfitImage outfit = OutfitImage.builder()
                        .id(photo.path("id").asText())
                        .imageUrl(photo.path("urls").path("regular").asText())
                        .description(photo.path("alt_description").asText("No description"))
                        .photographer(photo.path("user").path("name").asText("Unknown"))
                        .unsplashLink(photo.path("links").path("html").asText())
                        .build();

                outfits.add(outfit);
            }

        } catch (Exception e) {
            log.error("Failed to parse Unsplash response", e);
            throw new ExternalApiException("Could not parse Unsplash response: " + e.getMessage());
        }

        return outfits;
    }
}
