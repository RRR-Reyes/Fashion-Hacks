import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- STATE MANAGEMENT ---
  const [nasaData, setNasaData] = useState(null);
  const [fashionData, setFashionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [bonusData, setBonusData] = useState(null);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [bonusFashionData, setBonusFashionData] = useState(null);
  const [bonusFashionLoading, setBonusFashionLoading] = useState(false);

  // --- API FUNCTIONS ---

  const fetchNasaData = async () => {
    try {
      const response = await fetch('http://localhost:8080/nasa/image');
      const data = await response.json();
      setNasaData(data);
    } catch (err) { console.error("NASA Load Error:", err); }
  };

  const handleStitch = async () => {
    if (!nasaData) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8082/fashion/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: nasaData.description || nasaData.explanation }),
      });
      const result = await response.json();
      setFashionData(result);
    } catch (err) { console.error("AI Error:", err); } finally { setLoading(false); }
  };

  const fetchBonusImage = async () => {
    if (!selectedDate) return alert("Select a date!");
    setBonusLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/nasa/history?date=${selectedDate}`);
      const data = await response.json();
      setBonusData(data);
    } catch (err) { console.error("History Error:", err); } finally { setBonusLoading(false); }
  };

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
    } catch (err) { console.error("Bonus AI Error:", err); } finally { setBonusFashionLoading(false); }
  };

  useEffect(() => { fetchNasaData(); }, []);

  // --- UI RENDER ---
  return (
    <div className="app-container">
      <h1>FASHION HACKS</h1>

      <div className="action-bar main-controls">
        <button onClick={handleStitch} disabled={loading} className="primary-btn">
          {loading ? "Stitching..." : "Generate Today's Look"}
        </button>

        <div className="inheritance-connector">
          {/* Text removed for a cleaner look */}
          <div className="horizontal-arrow"></div>
        </div>

        <div className="action-group">
          <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="date-input" />
          <button onClick={fetchBonusImage} disabled={bonusLoading} className="secondary-btn">
            {bonusLoading ? "Scanning..." : "Explore History"}
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* TODAY COLUMN */}
        <div className="flow-column">
          {nasaData && (
            <>
              <div className="section card">
                <span className="badge">TODAY</span>
                <h2>{nasaData.title}</h2>
                <img src={nasaData.imageUrl || nasaData.url} alt="NASA" />
              </div>
              <div className="vertical-arrow">↓</div>
              {fashionData && (
                <div className="section card fashion-card fade-in">
                  <h2>Generated Look</h2>
                  <img src={fashionData.fashionImage} alt="Fashion" />
                  <p>{fashionData.vibeDescription}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* HISTORY COLUMN */}
        <div className="flow-column">
          {bonusData && (
            <>
              <div className="section card bonus-card">
                <span className="badge">HISTORY</span>
                <h2>{bonusData.title}</h2>
                <img src={bonusData.url || bonusData.imageUrl} alt="Bonus" />
                <button onClick={handleBonusStitch} disabled={bonusFashionLoading} className="mini-stitch-btn">
                  {bonusFashionLoading ? "Stitching..." : "Generate History Look"}
                </button>
              </div>
              <div className="vertical-arrow">↓</div>
              {bonusFashionData && (
                <div className="section card fashion-card fade-in">
                  <h2>Historical Vibe</h2>
                  <img src={bonusFashionData.fashionImage} alt="Fashion" />
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