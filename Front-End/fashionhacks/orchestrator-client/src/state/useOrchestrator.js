import { useState } from 'react';
import { getNasaImage, analyzeImage, getFashion } from '../services/api';

export const useOrchestrator = () => {
  const [nasaImage, setNasaImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [fashionResults, setFashionResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLook = async () => {
    setLoading(true);
    setError(null);
    try {
      const nasaData = await getNasaImage();
      setNasaImage(nasaData);

      const analysisData = await analyzeImage(nasaData.url || nasaData.hdurl);
      setAnalysis(analysisData);

      const fashionData = await getFashion(analysisData);
      setFashionResults(fashionData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    nasaImage,
    analysis,
    fashionResults,
    loading,
    error,
    generateLook
  };
};
