import { getTrendAnalysis } from '../services/claudeService.js';
import { calculateWardrobeTrendScores } from '../services/trendService.js';

/**
 * GET /api/trends
 * Computes general high-fashion forecasting and integrates current wardrobe stats.
 */
export const getTrendsForecasting = async (req, res, next) => {
  try {
    const season = req.query.season || 'Autumn/Winter';
    const location = req.query.location || 'Paris/Milan';
    
    // Parse closet items if passed by client, otherwise use simulated baseline
    let items = [];
    try {
      if (req.query.items) {
        items = JSON.parse(req.query.items);
      }
    } catch (e) {
      console.warn('Could not parse items array for trends analysis.');
    }

    // Step 1: Execute Claude Trend Forecaster
    const claudeTrends = await getTrendAnalysis(items, season, location);

    // Step 2: Compute closet synergy score algorithms
    const synergyResults = calculateWardrobeTrendScores(items);

    return res.status(200).json({
      success: true,
      season,
      location,
      metrics: {
        overallScore: claudeTrends.trendScore || synergyResults.trendScore,
        runwaySynergy: synergyResults.runwaySynergy,
        activeFibers: synergyResults.activeFibers
      },
      trendingForecast: claudeTrends.trendingItems,
      trendingColors: claudeTrends.trendingColors,
      forecastSuggestions: claudeTrends.forecastSuggestions || synergyResults.recommendations,
      timestamp: new Date()
    });
  } catch (error) {
    next(error);
  }
};
