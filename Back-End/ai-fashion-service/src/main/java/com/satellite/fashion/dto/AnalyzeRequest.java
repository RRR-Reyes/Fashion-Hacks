package com.satellite.fashion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Request body for POST /analyze
 * Sent by: Frontend Orchestrator (Dev #2)
 * Contains the NASA image URL returned by the NASA service (Backend Dev #1)
 */
@Data
public class AnalyzeRequest {

    @NotBlank(message = "imageUrl must not be blank")
    private String imageUrl;
}
