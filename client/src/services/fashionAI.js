import api from './api';

export const analyzeStyle = async (imageFile, profile = {}) => {
  const formData = new FormData();
  formData.append('outfit', imageFile);
  formData.append('bodyType', profile.bodyType || 'hourglass');
  formData.append('occasion', profile.occasion || 'Casual');
  formData.append('preferences', JSON.stringify(profile.preferences || {}));

  const data = await api.post('/style/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getStyleSuggestions = async (payload) => {
  const data = await api.post('/style/suggest', payload);
  return data;
};

export const getBodyTypeRecommendations = async (bodyType) => {
    const data = await api.post('/style/profile-recommendations', { bodyType });
    return data;
};


export const analyzeTrends = async (season, location, wardrobeItems = []) => {
  const params = {
    season,
    location,
    items: JSON.stringify(wardrobeItems)
  };

  const data = await api.get('/trends', { params });
  return data;
};

export const generateOutfitVisualizerData = async (outfitDescription) => {
  const data = await api.post('/visualize/outfit', { outfitItems: outfitDescription });
  return data;
};

/**
 * Fetches runway trends and closet synergy scores.
 */
export const fetchTrends = async (season, location, wardrobeItems = []) => {
  return analyzeTrends(season, location, wardrobeItems);
};

/**
 * Resolves three canvas shader uniforms based on active compositions.
 */
export const fetchVisualizationParams = async (outfitItems) => {
  const data = await api.post('/visualize/outfit', { outfitItems });
  return data;
};
