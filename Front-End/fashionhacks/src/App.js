import { useState, useEffect } from "react";
import NasaImage from "./components/NasaImage";
import VibeDescription from "./components/VibeDescription";
import ColorPalette from "./components/ColorPalette";
import TextureTags from "./components/TextureTags";
import FashionGallery from "./components/FashionGallery";
import './App.css';

function App() {

  const [utc, setUtc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  // 0 = idle, 1 = nasa fetched, 2 = ai analyzing, 3 = outfits matched

  const [nasaImage, setNasaImage] = useState({
  imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
  title: "Hubble's Cosmic Reef",
  description: "A pair of nebulas 163,000 light-years away in the Large Magellanic Cloud."
});  
  const [analysis, setAnalysis] = useState(null);

const [fashionResults, setFashionResults] = useState(null);

  // UTC clock
  useEffect(() => {
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
      const t = new Date();
      setUtc(`UTC ${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── THIS IS WHERE DEV #2 PLUGS IN ─────────────────────────
  // Right now it uses placeholder data so your UI works.
  // When orchestrator is ready, Dev #2 replaces the contents
  // of this function with real fetch() calls — nothing else changes.
  async function handleGenerate() {
  setIsLoading(true);
  setStep(0);
  setAnalysis(null);
  setFashionResults(null);

  try {
    // STEP 1 — fetch real NASA image from Backend Dev #1
    setStep(1);
    const nasaRes = await fetch("http://localhost:8080/nasa/image");
    const nasaData = await nasaRes.json();
    setNasaImage({
      imageUrl:    nasaData.imageUrl,
      title:       nasaData.title,
      description: nasaData.description
    });

    // STEP 2 — send image to Backend Dev #2 for AI analysis
    setStep(2);
    const analysisRes = await fetch("http://localhost:8082/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: nasaData.imageUrl })
    });
    const analysisData = await analysisRes.json();
    setAnalysis({
      colors:   analysisData.colors,
      textures: analysisData.textures,
      vibe:     analysisData.vibe
    });

    // STEP 3 — fetch outfit matches from Backend Dev #2
    setStep(3);
    const fashionRes = await fetch("http://localhost:8082/fashion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analysisData)
    });
    const fashionData = await fashionRes.json();
    setFashionResults(fashionData.outfits);

  } catch (err) {
    console.error("Pipeline failed:", err);
    // keeps showing whatever data loaded successfully so far
  }

  setIsLoading(false);
}

  return (
    <div className="App">
      <div className="content-wrapper">

        <nav className="site-nav">
          <div>
            <div className="brand-name">Satellite Street Style</div>
            <div className="brand-sub">NASA × Unsplash × AI Fashion Intelligence</div>
          </div>
          <div className="nav-tag">Today's Look</div>
        </nav>

        <div className="main-grid">

          <div className="left-panel">
            <NasaImage
              data={nasaImage}
              isLoading={isLoading}
              onGenerate={handleGenerate}
              step={step}
            />
          </div>

          <div className="right-panel">
            <VibeDescription vibe={analysis?.vibe} />
            <ColorPalette    colors={analysis?.colors} />
            <TextureTags     textures={analysis?.textures} />
            <FashionGallery  items={fashionResults} />
          </div>

        </div>

        <div className="bottom-bar">
          <span className="telemetry">ISS Coord — 28.5°N 80.6°W — Alt 408km</span>
          <span className="telemetry">{utc}</span>
        </div>

      </div>
    </div>
  );
}

export default App;