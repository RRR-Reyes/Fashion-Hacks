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
  const [analysis, setAnalysis]           = useState(null);
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

    // STEP 1 — NASA image
    setStep(1);
    const nasa = {
      imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
      title: "Hubble's Cosmic Reef",
      description: "A pair of nebulas 163,000 light-years away in the Large Magellanic Cloud."
    };
    setNasaImage(nasa);

    // STEP 2 — AI analysis
    await new Promise(r => setTimeout(r, 1400));
    setStep(2);
    const aiAnalysis = {
      colors:   ["#3375FF", "#FF8166", "#E033FF", "#0CEFCC"],
      textures: ["Iridescent", "Silk", "Mesh", "Metallic weave"],
      vibe:     "Ethereal and boundless — fluid silhouettes, iridescent fabrics, and a palette pulled from the edge of a nebula."
    };
    setAnalysis(aiAnalysis);

    // STEP 3 — Fashion results
    await new Promise(r => setTimeout(r, 1400));
    setStep(3);
    setFashionResults([
      { imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400" },
      { imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400" },
      { imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400" },
    ]);

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