import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const parseJsonResponse = (text) => {
  const clean = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    console.error("Original text:", text);
    throw new Error("AI returned invalid JSON format.");
  }
};

/**
 * Analyzes an outfit image using Gemini Vision.
 * @param {string} base64ImageData - The base64 encoded image data.
 * @param {string} mimeType - The MIME type of the image.
 * @returns {Promise<object>} The parsed JSON analysis.
 */
export const analyzeOutfit = async (base64ImageData, mimeType) => {
  const prompt = `
You are AURA, a luxury AI fashion stylist. Analyze this outfit 
photo with expert precision. Respond ONLY in valid JSON 
with no markdown, no backticks, no preamble. Return:
{
  "detectedItems": [{ "item": "string", "color": "string", "style": "string", "fabric": "string" }],
  "currentStyle": "string",
  "colorPalette": ["string"],
  "styleScore": "number (1-10)",
  "strengths": ["string"],
  "improvements": ["string"],
  "overallVibe": "string"
}`;

  const imagePart = {
    inlineData: {
      data: base64ImageData,
      mimeType,
    },
  };

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Error in analyzeOutfit:", error);
    // Simple retry logic
    try {
      const result = await model.generateContent([prompt + " Please ensure the output is a single, valid JSON object.", imagePart]);
      const response = await result.response;
      const text = response.text();
      return parseJsonResponse(text);
    } catch (retryError) {
      console.error("Retry failed in analyzeOutfit:", retryError);
      throw new Error("Failed to get a valid response from AI after retry.");
    }
  }
};

/**
 * Gets style suggestions based on user profile and outfit analysis.
 * @param {object} payload - The user data.
 * @returns {Promise<object>} The parsed JSON suggestions.
 */
export const getStyleSuggestions = async (payload) => {
  const prompt = `
You are AURA, a luxury AI fashion stylist. Based on the outfit analysis and user profile 
below, suggest 3 complete styled looks. 
Outfit: ${JSON.stringify(payload.detectedOutfit)}
Body type: ${payload.bodyType}
Occasion: ${payload.occasion}
Preferences: ${payload.preferences}
Respond ONLY in valid JSON with no markdown, no backticks, no preamble:
{
  "suggestions": [{
    "title": "string",
    "description": "string",
    "occasionFit": "string",
    "pieces": [{ "item": "string", "brand_tier": "string (e.g., 'Luxury', 'Contemporary', 'High-Street')", "color": "string", "why": "string" }],
    "styleWords": ["string"],
    "confidenceScore": "number (1-10)"
  }]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Error in getStyleSuggestions:", error);
    throw new Error("Failed to get style suggestions from AI.");
  }
};

/**
 * Gets fashion advice for a specific body type.
 * @param {string} bodyType - The user's body type.
 * @returns {Promise<object>} The parsed JSON recommendations.
 */
export const getBodyTypeRecommendations = async (bodyType) => {
    const prompt = `
You are AURA, a luxury AI fashion stylist. Give detailed fashion advice for 
a "${bodyType}" body type. Be specific, actionable, and inspiring.
Respond ONLY in valid JSON with no markdown, no backticks, no preamble:
{
  "doList": ["string"],
  "avoidList": ["string"],
  "keyPieces": ["string"],
  "celebStyleInspo": ["string"],
  "fitTips": ["string"]
}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return parseJsonResponse(text);
    } catch (error) {
        console.error("Error in getBodyTypeRecommendations:", error);
        throw new Error("Failed to get body type recommendations from AI.");
    }
};


/**
 * Analyzes a wardrobe for trend alignment.
 * @param {Array<object>} wardrobeItems - The user's wardrobe items.
 * @param {string} season - The current season.
 * @param {string} location - The user's location.
 * @returns {Promise<object>} The parsed JSON trend analysis.
 */
export const analyzeTrends = async (wardrobeItems, season, location) => {
  const prompt = `
You are AURA, a world-renowned AI fashion trend forecaster. Analyze this wardrobe for trend alignment 
with ${season} ${new Date().getFullYear()} trends in ${location}.
Wardrobe: ${JSON.stringify(wardrobeItems)}
Respond ONLY in valid JSON with no markdown, no backticks, no preamble:
{
  "trendScore": "number (1-100)",
  "trendingItems": [{ "item": "string", "trendPercentage": "number (1-100)", "status": "string (e.g., 'On-Trend', 'Fading', 'Classic')" }],
  "trendingColors": [{ "name": "string", "hex": "string", "trend": "string (e.g., 'Major', 'Minor', 'Emerging')" }],
  "forecastSuggestions": ["string"],
  "wardrobeGaps": ["string"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Error in analyzeTrends:", error);
    throw new Error("Failed to get trend analysis from AI.");
  }
};

/**
 * Generates 3D material properties for a Three.js visualizer.
 * @param {string} outfitDescription - A description of the outfit.
 * @returns {Promise<object>} The parsed JSON material data.
 */
export const generateOutfitVisualizerData = async (outfitDescription) => {
  const prompt = `
You are AURA, an AI 3D fashion artist. Convert this outfit description into material properties 
for a Three.js visualizer. Be creative and interpret the style into PBR material values.
Outfit: "${outfitDescription}"
Respond ONLY in valid JSON with no markdown, no backticks, no preamble:
{
  "topMaterial": { "color": "hex string", "roughness": "number (0-1)", "metalness": "number (0-1)", "emissive": "hex string (or '#000000')" },
  "bottomMaterial": { "color": "hex string", "roughness": "number (0-1)", "metalness": "number (0-1)", "emissive": "hex string (or '#000000')" },
  "accentColor": "hex string",
  "lightingMood": "string (e.g., 'Dramatic', 'Soft', 'Studio')",
  "backgroundSuggestion": "string (e.g., 'Dark Cityscape', 'Minimalist Studio', 'Abstract Gradient')"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Error in generateOutfitVisualizerData:", error);
    throw new Error("Failed to get visualizer data from AI.");
  }
};

/**
 * Streams a chat response for a style conversation.
 * @param {Array<object>} messages - The chat history.
 * @param {object} res - The Express response object to stream to.
 */
export const streamStyleChat = async (messages, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await model.generateContentStream({ contents: messages });
    for await (const chunk of stream.stream) {
      const chunkText = chunk.text();
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
  } catch (error) {
    console.error("Error in streamStyleChat:", error);
    res.write(`data: ${JSON.stringify({ error: "Stream failed." })}\n\n`);
    res.end();
  }
};
