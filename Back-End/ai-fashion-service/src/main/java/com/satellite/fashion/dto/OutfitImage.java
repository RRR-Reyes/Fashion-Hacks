package com.satellite.fashion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a single outfit photo returned from Unsplash.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OutfitImage {

    /** Direct URL to the photo (regular size) */
    private String imageUrl;

    /** Unsplash photo ID */
    private String id;

    /** Alt description from Unsplash */
    private String description;

    /** Photographer's name */
    private String photographer;

    /** Link to the Unsplash photo page (for attribution - required by Unsplash API terms) */
    private String unsplashLink;
}
