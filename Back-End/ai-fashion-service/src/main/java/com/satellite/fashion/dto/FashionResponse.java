package com.satellite.fashion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response body for POST /fashion
 * Consumed by: Frontend Orchestrator (Dev #2), displayed by UI app (Dev #1)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FashionResponse {

    /** 3–5 outfit images sourced from Unsplash */
    private List<OutfitImage> outfits;

    /** Echo back the vibe used so the UI can display it */
    private String vibe;

    /** Echo back the color palette so <ColorPalette /> component can render it */
    private List<String> colors;
}
