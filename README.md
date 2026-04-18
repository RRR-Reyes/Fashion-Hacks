"# Fashion-Hacks" 
# 🌌 Satellite Street Style
**"Space is cold, but your style doesn't have to be."**

## 🚀 Project Overview
Satellite Street Style is a data-driven fashion engine that translates real-time celestial events into modern streetwear inspiration. By merging NASA's deep-space imagery with high-speed AI semantic analysis, we curate "Outfits of the Day" (OOTDs) that mirror the cosmic aesthetic of the universe.

## 🧠 The Logic Pipeline
1.  **NASA Data Retrieval**: The system pulls the daily astronomical data from NASA via a dedicated Java microservice.
2.  **AI Semantic Analysis**: Using the **Groq LPU Inference Engine**, the system analyzes the textual description and metadata of the celestial event to extract dominant colors, textures (e.g., metallic, dusty, matte), and "vibes."
3.  **Fashion Synthesis**: These attributes are mapped to the **Unsplash API** to retrieve high-end streetwear and specialized outerwear that mirror the current cosmic data.

## 🛠️ Technical Stack
-   **Frontend**: React + Vite (Fast, modular UI)
-   **Backend (Microservices)**: 
    -   **NASA Service**: Java / Spring Boot (Data fetching & edge-case hardening)
    -   **AI & Fashion Service**: Java / Spring Boot (Integration with Groq and Unsplash)
-   **APIs**: 
    -   NASA Open API
    -   Groq API (Llama 3 / Mixtral)
    -   Unsplash API
-   **DevOps**: GitHub (Collaborative Gitflow)

## 📡 NASA Service API (Java/Spring Boot)
This microservice serves as the "source of truth" for the application, providing a hardened data stream for the entire pipeline.

### Endpoint: `GET /nasa/image`
**Description:** Fetches the daily astronomical image and metadata.

**Sample Response (Live Data Contract):**
```json
{
  "imageUrl": "[https://apod.nasa.gov/apod/image/2604/PanstarrsPlanetsPerrotLab1024.jpg](https://apod.nasa.gov/apod/image/2604/PanstarrsPlanetsPerrotLab1024.jpg)",
  "title": "PanSTARRS and Planets",
  "description": "Near the eastern horizon before sunrise, Comet C/2025 R3 PanSTARRS is getting brighter. Readily visible in binoculars and small telescopes, the comet may be just on the verge of naked-eye visibility from dark sky sites. Though it was not quite apparent to the eye, PanSTARRS is still easy to spot in this camera image taken on April 16. In the view from a volcanic peak overlooking France's Reunion Island, planet Earth, the comet shares eastern predawn skies with naked-eye planets Mars and Mercury and fainter Neptune. Saturn is hiding behind the low cloudbank that doesn't quite hide an old crescent Moon. This is a good weekend for northern hemisphere comet watchers to try to catch PanSTARRS an hour or so before sunrise, as the comet grows brighter approaching its perihelion on April 19. On April 26 the comet makes its closest approach to our fair planet but by then will be difficult to see in the solar glare. Good views of this comet PanSTARRS in late April and early May will be from the southern hemisphere."
}