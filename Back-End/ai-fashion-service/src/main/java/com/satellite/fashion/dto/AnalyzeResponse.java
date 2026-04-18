package com.satellite.fashion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response body for POST /analyze
 * Also used as the request body for POST /fashion
 *
 * Contains the AI-extracted style attributes from the NASA image.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyzeResponse {

    /** 3 dominant HEX color codes, e.g. ["#1a2b3c", "#ff6600", "#e8d5b0"] */
    private List<String> colors;

    /** 2 texture descriptors, e.g. ["matte", "iridescent"] */
    private List<String> textures;

    /** Short vibe/mood description, e.g. "cosmic dusty warm desert" */
    private String vibe;
}
