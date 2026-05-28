import {
  analyzeOutfit,
  getStyleSuggestions as getGeminiStyleSuggestions,
  getBodyTypeRecommendations,
  analyzeTrends,
  generateOutfitVisualizerData
} from './geminiService.js';

export const analyzeOutfitImage = async (imageBuffer, mimeType) => analyzeOutfit(imageBuffer.toString('base64'), mimeType);

export const getStyleSuggestions = async (detectedOutfit, bodyType, occasion, preferences) => {
  const result = await getGeminiStyleSuggestions({
    detectedOutfit,
    bodyType,
    occasion,
    preferences
  });

  return result;
};

export const getBodyRecommendations = async (bodyType) => getBodyTypeRecommendations(bodyType);

export const getTrendAnalysis = async (items, season, location) => analyzeTrends(items, season, location);

export const getOutfitVisualizerPrompt = async (outfit) => {
  const data = await generateOutfitVisualizerData(Array.isArray(outfit) ? JSON.stringify(outfit) : outfit);
  return JSON.stringify(data);
};
