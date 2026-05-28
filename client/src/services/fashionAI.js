import api from './api.js';

/**
 * Sends outfit image file and user preferences to Express style analyzer.
 */
import api from './api';

export const analyzeStyle = async (imageFile) => {
  const formData = new FormData();
  formData.append('outfit', imageFile);

  const { data } = await api.post('/style/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getStyleSuggestions = async (payload) => {
  const { data } = await api.post('/style/suggest', payload);
  return data;
};

export const getBodyTypeRecommendations = async (bodyType) => {
    const { data } = await api.post('/style/body-type', { bodyType });
    return data;
};


export const analyzeTrends = async (payload) => {
  const { data } = await api.post('/trends/analyze', payload);
  return data;
};

export const generateOutfitVisualizerData = async (outfitDescription) => {
  const { data } = await api.post('/visualize', { outfitDescription });
  return data;
};

/**
 * Fetches runway trends and closet synergy scores.
 */
export const fetchTrends = async (season, location, wardrobeItems = []) => {
  const params = {
    season,
    location,
    items: JSON.stringify(wardrobeItems)
  };
  
  return api.get('/trends', { params });
};

/**
 * Resolves three canvas shader uniforms based on active compositions.
 */
export const fetchVisualizationParams = async (outfitItems) => {
  return api.post('/visualize/outfit', { outfitItems });
};
