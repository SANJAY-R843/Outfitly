import { useState } from 'react';
import { analyzeStyle, analyzeTrends } from '../services/fashionAI.js';

export const useAI = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loadingTrends, setLoadingTrends] = useState(false);
  const [error, setError] = useState(null);

  const runOutfitAnalysis = async (imageFile, bodyType, occasion, preferences) => {
    try {
      setAnalyzing(true);
      setError(null);
      const response = await analyzeStyle(imageFile, {
        bodyType,
        occasion,
        preferences
      });
      if (response) {
        setAnalysisResult(response);
        const history = localStorage.getItem('aura_analysis_history');
        const parsedHistory = history ? JSON.parse(history) : [];
        parsedHistory.unshift({
          id: `scan-${Date.now()}`,
          date: new Date().toISOString(),
          styleScore: response.styleScore,
          currentStyle: response.currentStyle,
          colors: response.colorPalette
        });
        localStorage.setItem('aura_analysis_history', JSON.stringify(parsedHistory.slice(0, 10)));
      }
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred during AI analysis.');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  const runTrendsForecasting = async (season, location, closetItems) => {
    try {
      setLoadingTrends(true);
      setError(null);
      const response = await analyzeTrends(season, location, closetItems);
      if (response) {
        setTrends(response);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Unable to load trend intelligence.');
      throw err;
    } finally {
      setLoadingTrends(false);
    }
  };

  return {
    analyzing,
    analysisResult,
    trends,
    loadingTrends,
    error,
    runOutfitAnalysis,
    runTrendsForecasting
  };
};
