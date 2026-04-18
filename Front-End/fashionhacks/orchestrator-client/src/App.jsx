import React from 'react';
import { useOrchestrator } from './state/useOrchestrator';
import NasaImage from './components/NasaImage';
import FashionGallery from './components/FashionGallery';
import ColorPalette from './components/ColorPalette';
import styles from './App.module.css';

function App() {
  const { 
    nasaImage, 
    analysis,
    fashionResults, 
    loading, 
    error, 
    generateLook 
  } = useOrchestrator();

  const hasData = nasaImage || fashionResults || (analysis && analysis.colors);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cosmic Orchestrator</h1>
        <p>Generate high-fashion looks inspired by the universe.</p>
        
        <button 
          onClick={generateLook}
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Analyzing the Stars...' : 'Generate My Look'}
        </button>

        {error && <p className={styles.error}>Error: {error}</p>}
      </header>

      {hasData && (
        <>
          <main className={styles.mainContent}>
            <section className={styles.leftPanel}>
              <NasaImage data={nasaImage} />
            </section>
            
            <section className={styles.rightPanel}>
              <FashionGallery results={fashionResults} />
            </section>
          </main>

          <footer className={styles.footer}>
            {analysis && analysis.colors && (
              <ColorPalette colors={analysis.colors} />
            )}
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
