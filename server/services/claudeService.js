import Anthropic from '@anthropic-ai/sdk';

const getClaudeClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.includes('your_key')) {
    const error = new Error('ANTHROPIC_API_KEY is not configured. Set it in your .env file.');
    error.statusCode = 500;
    throw error;
  }
  return new Anthropic({ apiKey });
};

const parseJson = (text, context) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    const parseError = new Error(`Failed to parse ${context} response as JSON.`);
    parseError.statusCode = 502;
    parseError.details = text;
    throw parseError;
  }
};

const extractText = (response) => {
  const content = response?.content?.[0]?.text;
  if (!content) {
    const error = new Error('Claude response was empty or malformed.');
    error.statusCode = 502;
    throw error;
  }
  return content.trim();
};

/**
 * 1. OUTFIT ANALYSIS (Vision)
 */
export const analyzeOutfitImage = async (imageBuffer, mimeType) => {
  const client = getClaudeClient();
  const base64Data = imageBuffer.toString('base64');

  const prompt = `You are a luxury fashion stylist AI named AURA.
Analyze this outfit photo. Return a JSON object with:
{
  "detectedItems": [{"item": "string", "color": "hex", "style": "string", "fabric": "string"}],
  "currentStyle": "string",
  "colorPalette": ["#hex"],
  "styleScore": 1-10 number,
  "strengths": ["string"],
  "improvements": ["string"]
}
Return JSON only with valid hex colors.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1200,
    temperature: 0.2,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType || 'image/jpeg',
              data: base64Data
            }
          }
        ]
      }
    ]
  });

  return parseJson(extractText(response), 'outfit analysis');
};

/**
 * 2. STYLE SUGGESTIONS
 */
export const getStyleSuggestions = async (detectedOutfit, bodyType, occasion, preferences) => {
  const client = getClaudeClient();

  const prompt = `You are a luxury fashion stylist AI named AURA.
Given:
detectedOutfit: ${JSON.stringify(detectedOutfit)}
bodyType: ${bodyType}
occasion: ${occasion}
preferences: ${JSON.stringify(preferences)}

Return JSON:
{
  "suggestions": [{
    "title": "string",
    "description": "string",
    "occasionFit": "string",
    "pieces": [{"item": "string", "brand_tier": "string", "color": "hex", "why": "string"}],
    "styleWords": ["string"],
    "confidenceScore": number
  }]
}
Return JSON only with valid hex colors.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1400,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }]
  });

  return parseJson(extractText(response), 'style suggestions');
};

/**
 * 3. BODY TYPE RECOMMENDATIONS
 */
export const getBodyRecommendations = async (bodyType) => {
  const client = getClaudeClient();

  const prompt = `Body type: ${bodyType}
Return JSON:
{
  "doList": ["string"],
  "avoidList": ["string"],
  "keyPieces": ["string"],
  "celebStyleInspo": "string"
}
Return JSON only.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 900,
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }]
  });

  return parseJson(extractText(response), 'body recommendations');
};

/**
 * 4. TREND ANALYSIS
 */
export const getTrendAnalysis = async (items, season, location) => {
  const client = getClaudeClient();

  const prompt = `Analyze trends for:
items: ${JSON.stringify(items)}
season: ${season}
location: ${location}

Return JSON:
{
  "trendingItems": [{"item": "string", "growth": "string", "status": "Rising|Peak|Fading"}],
  "trendScore": number,
  "trendingColors": ["#hex"],
  "forecastSuggestions": ["string"]
}
Return JSON only with valid hex colors.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1100,
    temperature: 0.25,
    messages: [{ role: 'user', content: prompt }]
  });

  return parseJson(extractText(response), 'trend analysis');
};

/**
 * 5. AI OUTFIT VISUALIZATION PROMPT GENERATION
 */
export const getOutfitVisualizerPrompt = async (outfit) => {
  const client = getClaudeClient();

  const prompt = `Generate a concise, detailed text-to-image prompt describing this outfit
for a 3D avatar material system. Include primary colors, fabric types,
roughness and metalness cues, and lighting vibe. Keep under 40 words.
Outfit: ${JSON.stringify(outfit)}
Return text only.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }]
  });

  return extractText(response);
};
