import { analyzeOutfitImage, getStyleSuggestions, getBodyRecommendations } from '../services/claudeService.js';
import { compressImageBuffer } from '../services/imageAnalysis.js';

/**
 * Endpoint POST /api/style/analyze
 * Processes image file, runs Claude Vision analysis, and fetches tailored suggestions.
 */
export const analyzeOutfit = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No outfit photo uploaded. Please attach a valid JPG/PNG file.' });
    }

    // Step 1: Compress and prepare image
    const { buffer: compressedBuffer, mimeType } = await compressImageBuffer(req.file.buffer);

    // Step 2: Extract attributes from body/preferences
    const bodyType = req.body.bodyType || 'hourglass';
    const occasion = req.body.occasion || 'Casual';
    let preferences = {};
    if (req.body.preferences) {
      try {
        preferences = typeof req.body.preferences === 'string'
          ? JSON.parse(req.body.preferences)
          : req.body.preferences;
      } catch (e) {
        return res.status(400).json({ success: false, error: 'preferences must be valid JSON.' });
      }
    }

    console.log(`[AURA Controller] Starting analysis: BodyType: ${bodyType}, Occasion: ${occasion}`);

    // Step 3: Run Claude Vision analysis
    const outfitAnalysis = await analyzeOutfitImage(compressedBuffer, mimeType);

    // Step 4: Run secondary styling suggestions
    const suggestionsResult = await getStyleSuggestions(
      outfitAnalysis,
      bodyType,
      occasion,
      preferences
    );

    // Step 5: Get specific body recommendations to augment the feedback
    const bodyRecs = await getBodyRecommendations(bodyType);

    // Return aggregated luxury profile
    return res.status(200).json({
      success: true,
      analysis: {
        ...outfitAnalysis,
        bodyRecommendations: bodyRecs
      },
      stylingConsultation: suggestionsResult.suggestions,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Endpoint POST /api/style/profile-recommendations
 * Gets body type recommendations directly based on preferences.
 */
export const getProfileRecommendations = async (req, res, next) => {
  try {
    const { bodyType } = req.body;
    if (!bodyType) {
      return res.status(400).json({ success: false, error: 'bodyType silhouette identifier is required.' });
    }

    const recommendations = await getBodyRecommendations(bodyType);
    return res.status(200).json({
      success: true,
      bodyType,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};
