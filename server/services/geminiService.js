import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const extractJSON = (text) => {
  const candidates = [
    text,
    text.replace(/```json|```/g, '').trim(),
    (() => {
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return text;
      return text.slice(firstBrace, lastBrace + 1);
    })(),
    (() => {
      const firstBracket = text.indexOf('[');
      const lastBracket = text.lastIndexOf(']');
      if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) return text;
      return text.slice(firstBracket, lastBracket + 1);
    })()
  ];

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      // Keep trying narrower slices.
    }
  }

  throw new Error('AI returned invalid JSON format.');
};

const runJsonPrompt = async (prompt, imagePart) => {
  const firstPass = await model.generateContent(imagePart ? [prompt, imagePart] : prompt);
  const firstText = (await firstPass.response).text();

  try {
    return extractJSON(firstText);
  } catch (error) {
    const retryPrompt = `${prompt}\n\nReturn only one valid JSON object. Do not wrap the output in markdown or explanations.`;
    const secondPass = await model.generateContent(imagePart ? [retryPrompt, imagePart] : retryPrompt);
    const secondText = (await secondPass.response).text();
    return extractJSON(secondText);
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

  return runJsonPrompt(prompt, imagePart);
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

  return runJsonPrompt(prompt);
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

    return runJsonPrompt(prompt);
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

  return runJsonPrompt(prompt);
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

  return runJsonPrompt(prompt);
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
