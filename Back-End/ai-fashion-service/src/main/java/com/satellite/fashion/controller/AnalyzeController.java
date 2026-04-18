package com.satellite.fashion.controller;

import com.satellite.fashion.dto.AnalyzeRequest;
import com.satellite.fashion.dto.AnalyzeResponse;
import com.satellite.fashion.service.OpenAIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/analyze")
@RequiredArgsConstructor
public class AnalyzeController {

    private final OpenAIService openAIService;

    /**
     * POST /analyze
     *
     * Accepts a NASA image URL and returns AI-extracted style attributes.
     *
     * Request:  { "imageUrl": "https://apod.nasa.gov/image.jpg" }
     * Response: { "colors": [...], "textures": [...], "vibe": "..." }
     */
    @PostMapping
    public ResponseEntity<AnalyzeResponse> analyze(@Valid @RequestBody AnalyzeRequest request) {
        log.info("POST /analyze called with imageUrl: {}", request.getImageUrl());

        AnalyzeResponse response = openAIService.analyzeImage(request.getImageUrl());

        log.info("Analysis complete - vibe: {}, colors: {}", response.getVibe(), response.getColors());
        return ResponseEntity.ok(response);
    }
}
