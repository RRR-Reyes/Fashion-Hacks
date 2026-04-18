package com.satellite.fashion.controller;

import com.satellite.fashion.dto.AnalyzeResponse;
import com.satellite.fashion.dto.FashionResponse;
import com.satellite.fashion.service.UnsplashService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/fashion")
@RequiredArgsConstructor
public class FashionController {

    private final UnsplashService unsplashService;

    /**
     * POST /fashion
     *
     * Accepts the AnalyzeResponse (colors, textures, vibe) and returns
     * a list of matching outfit images from Unsplash.
     *
     * Request:  { "colors": [...], "textures": [...], "vibe": "..." }
     * Response: { "outfits": [...], "vibe": "...", "colors": [...] }
     */
    @PostMapping
    public ResponseEntity<FashionResponse> getFashion(@Valid @RequestBody AnalyzeResponse request) {
        log.info("POST /fashion called with vibe: {}", request.getVibe());

        FashionResponse response = unsplashService.searchOutfits(request);

        log.info("Fashion search complete - {} outfits returned", response.getOutfits().size());
        return ResponseEntity.ok(response);
    }
}
