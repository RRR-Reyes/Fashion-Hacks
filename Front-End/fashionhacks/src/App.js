import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- 1. STATE MANAGEMENT ---
  // Today's Feature
  const [nasaData, setNasaData] = useState(null);
  const [fashionData, setFashionData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Bonus History Feature
  const [selectedDate, setSelectedDate] = useState('');
  const [bonusData, setBonusData] = useState(null);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [bonusFashionData, setBonusFashionData] = useState(null);
  const [bonusFashionLoading, setBonusFashionLoading] = useState(false);

  // --- 2. API FUNCTIONS ---

  // Fetch today's cosmic data
  const fetchNasaData = async () => {
    try {
      const response = await fetch('http://localhost:8080/nasa/image');
      const data = await response.json();
      setNasaData(data);
    } catch (err) {
      console.error("NASA Load Error:", err);
    }
  };

  // Generate today's fashion vibe
  const handleStitch = async () => {
    if (!nasaData) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8082/fashion/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: nasaData.explanation || nasaData.description }),
      });
      const result = await response.json();
      setFashionData(result);
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch historical cosmic data
  const fetchBonusImage = async () => {
    if (!selectedDate) return alert("Please select a date first!");
    setBonusLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/nasa/history?date=${selectedDate}`);
      const data = await response.json();
      setBonusData(data);
    } catch (err) {
      console.error("History Error:", err);
    } finally {
      setBonusLoading(false);
    }
  };

  // Generate historical fashion vibe
  const handleBonusStitch = async () => {
    if (!bonusData) return;
    setBonusFashionLoading(true);
    try {
      const response = await fetch('http://localhost:8082/fashion/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: bonusData.explanation || bonusData.description }),
      });
      const result = await response.json();
      setBonusFashionData(result);
    } catch (err) {
      console.error("Bonus AI Error:", err);
    } finally {
      setBonusFashionLoading(false);
    }
  };

  // Initialize app on load
  useEffect(() => {
    fetchNasaData();
  }, []);

  // --- 3. UI RENDER ---
  return (
    <div className="app-container">
      <h1>FASHION HACKS</h1>

      {/* ACTION CENTER: Controls for both features */}
      <div className="action-bar main-controls">
        <button onClick={handleStitch} disabled={loading} className="primary-btn">
          {loading ? "Stitching..." : "Generate Today's Look"}
        </button>

        <div className="inheritance-connector">
          <div className="horizontal-arrow"></div>
        </div>

        <div className="action-group">
          <input 
            type="date" 
            onChange={(e) => setSelectedDate(e.target.value)} 
            className="date-input" 
          />
          <button onClick={fetchBonusImage} disabled={bonusLoading} className="secondary-btn">
            {bonusLoading ? "Scanning..." : "Explore History"}
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* COLUMN 1: TODAY'S FLOW */}
        <div className="flow-column">
          {nasaData && (
            <>
              <div className="section card">
                <span className="badge">TODAY</span>
                <h2>{nasaData.title}</h2>
                
                {/* Media Check: Handles Video vs Image */}
                {nasaData.media_type === 'video' ? (
                  <iframe 
                    src={nasaData.url} 
                    title="NASA Video"
                    className="media-item"
                    style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', border: 'none' }} 
                  />
                ) : (
                  <img src={nasaData.imageUrl || nasaData.url} alt="NASA" className="media-item" />
                )}
              </div>

              <div className="vertical-arrow">↓</div>

              {fashionData && (
                <div className="section card fashion-card fade-in">
                  <h2>Generated Look</h2>
                  <img src={fashionData.fashionImage} alt="Fashion" className="media-item" />
                  <p>{fashionData.vibeDescription}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* COLUMN 2: HISTORY FLOW */}
        <div className="flow-column">
          {bonusData && (
            <>
              <div className="section card bonus-card">
                <span className="badge">HISTORY</span>
                <h2>{bonusData.title}</h2>
                
                {/* Media Check: Handles Video vs Image */}
                {bonusData.media_type === 'video' ? (
                  <iframe 
                    src={bonusData.url} 
                    title="NASA Bonus Video"
                    className="media-item"
                    style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', border: 'none' }} 
                  />
                ) : (
                  <img src={bonusData.url || bonusData.imageUrl} alt="Bonus Space" className="media-item" />
                )}

                <button onClick={handleBonusStitch} disabled={bonusFashionLoading} className="mini-stitch-btn">
                  {bonusFashionLoading ? "Stitching..." : "Generate History Look"}
                </button>
              </div>

              <div className="vertical-arrow">↓</div>

              {bonusFashionData && (
                <div className="section card fashion-card fade-in">
                  <h2>Historical Vibe</h2>
                  <img src={bonusFashionData.fashionImage} alt="Fashion" className="media-item" />
                  <p>{bonusFashionData.vibeDescription}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;