/**
 * Analyzes current local virtual wardrobe categories and returns Runway Synergy matches.
 */
export const calculateWardrobeTrendScores = (items = []) => {
  if (!items || items.length === 0) {
    return {
      trendScore: 50,
      runwaySynergy: 'Establishing Base Closet',
      activeFibers: ['Minimalist Obsidian Cotton'],
      recommendations: [
        'Upload your first structured jacket or blazer to initialize high-fashion tailoring metrics.',
        'Incorporate electric ivory tops to create robust contrast scales.'
      ]
    };
  }

  // Count categories
  const categories = items.map(i => (i.category || 'unknown').toLowerCase());
  const hasBlazer = categories.some(c => c.includes('blazer') || c.includes('outerwear') || c.includes('jacket'));
  const hasBoots = categories.some(c => c.includes('shoes') || c.includes('boots'));
  const colorSchemes = items.map(i => (i.color || '#000000').toUpperCase());

  // Calculate matching gold/obsidian elements
  const obsidianMatches = colorSchemes.filter(c => c === '#0A0A0B' || c === '#0F0F13').length;
  const goldMatches = colorSchemes.filter(c => c === '#C9A84C' || c === '#E8C96A').length;

  let baseScore = 60;
  let activeFibers = ['Cyber Tailoring Base'];

  if (hasBlazer) {
    baseScore += 15;
    activeFibers.push('Avant-Garde Tailored Structure');
  }
  if (hasBoots) {
    baseScore += 10;
    activeFibers.push('Cyberpunk Footwear Anchors');
  }
  if (obsidianMatches > 0) {
    baseScore += 5;
    activeFibers.push('Obsidian Foundation');
  }
  if (goldMatches > 0) {
    baseScore += 10;
    activeFibers.push('Liquid Gold Accenting');
  }

  // Cap at 100
  const finalScore = Math.min(baseScore, 100);

  let runwaySynergy = 'Emerging Haute Chic';
  if (finalScore >= 90) runwaySynergy = 'Haute Couture Pioneer';
  else if (finalScore >= 80) runwaySynergy = 'Premium Editorial Ready';
  else if (finalScore >= 70) runwaySynergy = 'Stylishly Balanced';

  // Custom recommendations based on gaps
  const recommendations = [];
  if (!hasBlazer) {
    recommendations.push('Incorporate an oversized structured black velvet blazer to raise structural layering depth.');
  }
  if (!goldMatches) {
    recommendations.push('Add liquid gold mesh undershirts or accent belt hardware to generate focal lighting highlights.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintain high-contrast layers by pairing electric ivory fabrics with heavy obsidian leather drapes.');
    recommendations.push('Introduce asymmetric cyberpunk cuts (cut-out mock necks) to elevate visual geometry.');
  }

  return {
    trendScore: finalScore,
    runwaySynergy,
    activeFibers,
    recommendations
  };
};
