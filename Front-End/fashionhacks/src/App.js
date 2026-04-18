// This app expects: NASAImage, Analysis, fashionResults (from orchestrator later)
import NasaImage from "./components/NasaImage";
import VibeDescription from "./components/VibeDescription";
import ColorPalette from "./components/ColorPalette";
import TextureTags from "./components/TextureTags";
import FashionGallery from "./components/FashionGallery";
import './App.css';

function App() {

  const nasaImage = {
imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",  title: "Fashion Cluster",
  description: "As NASA devolpes, we design. Putting into different fastion sytles as you please."
};

  const analysis = {
    colors: ["#3375FF", "#FF8166", "#FF33DB"],
    textures: ["Denium ", "Silky"],
    vibe: "Confident, streetwear inspired by cosmic energy."
  };

  const fashionResults = [
   { imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80" },
  { imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { imageUrl: "https://images.unsplash.com/photo-1605289355680-75fb41239154" },
  ];
  return (
    <div className="App">
       <div className="content-wrapper">

        {/* LEFT SIDE — NASA IMAGE */}
        <div className="left-panel">
          {/* TODO: Replace nasaImage with props.nasaImage when orchestrator connects*/}
          <NasaImage data={nasaImage} />
        </div>

        {/* RIGHT SIDE — ANALYSIS + FASHION */}
        <div className="right-panel">
          <VibeDescription vibe={analysis.vibe} />
          <ColorPalette colors={analysis.colors} />
          <TextureTags textures={analysis.textures} />
          <FashionGallery items={fashionResults} />
        </div>

      </div>
    </div>
  );
}

export default App;
