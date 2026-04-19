import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- 1. STATE VARIABLES ---
  // These hold the data so React can display it on the screen
  const [nasaData, setNasaData] = useState(null);
  const [fashionData, setFashionData] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- 2. THE FETCH FUNCTIONS ---
  
  // Gets the daily space data from Port 8080
  const fetchNasaData = async () => {
    try {
      const response = await fetch('http://localhost:8080/nasa/image');
      const data = await response.json();
      setNasaData(data); // Saves the title, description, and imageURL
    } catch (err) {
      console.error("NASA Service Error:", err);
    }
  };

  // Sends the NASA description to Port 8082 to get a fashion vibe
  const handleStitch = async () => {
    if (!nasaData) return;
    
    setLoading(true); // Start a loading spinner
    try {
      const response = await fetch('http://localhost:8082/fashion/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: nasaData.description }),
      });
      const result = await response.json();
      setFashionData(result); // Saves the AI description and Unsplash image
    } catch (err) {
      console.error("AI Service Error:", err);
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  // --- 3. THE LIFECYCLE (useEffect) ---
  // This runs fetchNasaData once as soon as the user opens the site
  useEffect(() => {
    fetchNasaData();
  }, []);

  return (
    <div className="app-container">
      <h1>Cosmic Couture</h1>

      {/* --- 4. NASA DISPLAY --- */}
      {nasaData && (
        <div className="section">
          <h2>NASA Inspiration: {nasaData.title}</h2>
          <img src={nasaData.imageUrl} alt="NASA" style={{ width: '400px' }} />
          <p>{nasaData.description}</p>
          
          <button onClick={handleStitch} disabled={loading}>
            {loading ? "Stitching..." : "Generate My Look"}
          </button>
        </div>
      )}

      {/* --- 5. FASHION DISPLAY --- */}
      {fashionData && (
        <div className="section fashion-result">
          <h2>Your Cosmic Vibe</h2>
          <img src={fashionData.fashionImage} alt="Fashion" style={{ width: '400px' }} />
          <p>{fashionData.vibeDescription}</p>
        </div>
      )}
    </div>
  );
}

export default App;