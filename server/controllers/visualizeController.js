import { getOutfitVisualizerPrompt } from '../services/claudeService.js';

/**
 * POST /api/visualize/outfit
 * Translates clothing compositions into custom R3F shader parameters.
 */
export const resolveOutfitVisualization = async (req, res, next) => {
  try {
    const { outfitItems } = req.body;
    
    if (!outfitItems || !Array.isArray(outfitItems)) {
      return res.status(400).json({ success: false, error: 'outfitItems array is required to configure 3D model properties.' });
    }

    // Step 1: Run Claude prompt processor to get visualizer metadata
    const visualizerPrompt = await getOutfitVisualizerPrompt(outfitItems);

    // Step 2: Determine primary fabric styles and resolve shader constants
    let primaryColor = '#0A0A0B';
    let secondaryColor = '#C9A84C';
    let roughness = 0.3;
    let metalness = 0.2;
    let scanlineSpeed = 1.0;
    let fabricTheme = 'standard';

    // Parse items to set specific colors
    if (outfitItems.length > 0) {
      primaryColor = outfitItems[0].color || '#0A0A0B';
      if (outfitItems.length > 1) {
        secondaryColor = outfitItems[1].color || '#C9A84C';
      }

      // Check fabrics to change rendering properties
      const fabrics = outfitItems.map(i => (i.fabric || '').toLowerCase());

      if (fabrics.some(f => f.includes('velvet') || f.includes('satin'))) {
        roughness = 0.45;
        metalness = 0.05;
        fabricTheme = 'draped-velvet';
      } else if (fabrics.some(f => f.includes('mesh') || f.includes('chrome') || f.includes('gold') || f.includes('lurex'))) {
        roughness = 0.15;
        metalness = 0.85;
        fabricTheme = 'cyber-chrome';
        scanlineSpeed = 1.8;
      }
    }

    return res.status(200).json({
      success: true,
      shaderParams: {
        primaryColor,
        secondaryColor,
        roughness,
        metalness,
        scanlineSpeed,
        fabricTheme,
        visualizerPrompt
      },
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
};
