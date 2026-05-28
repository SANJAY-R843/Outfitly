/**
 * Maps common hex codes to luxury branding names
 */
export const BRAND_COLOR_MAP = {
  '#0A0A0B': { name: 'Obsidian Black', mood: 'Vast, structural, structural foundation' },
  '#0F0F13': { name: 'Void Shadow', mood: 'Deep matte elegance' },
  '#16161D': { name: 'Cyber Charcoal', mood: 'Stealth technical matte' },
  '#C9A84C': { name: 'Liquid Gold', mood: 'Opulent, metallic, specular focal glow' },
  '#E8C96A': { name: 'Light Gold Glow', mood: 'Luminous light accents' },
  '#F5F0E8': { name: 'Electric Ivory', mood: 'Crisp organic matte backdrop' },
  '#1A0A2E': { name: 'Deep Cyber Violet', mood: 'Ambient low-light twilight glow' },
  '#FFFFFF': { name: 'Blank Canvas', mood: 'Neutral stark pure light' },
  '#000000': { name: 'Absolute Dark', mood: 'Clean velvet void' }
};

/**
 * Normalizes color hex strings and resolves luxury titles
 */
export const resolveColorBranding = (hex) => {
  if (!hex) return { name: 'Editorial Shade', mood: 'Mysterious, bespoke texture' };
  
  const normalized = hex.toUpperCase().trim();
  
  // Find exact brand match
  if (BRAND_COLOR_MAP[normalized]) {
    return BRAND_COLOR_MAP[normalized];
  }

  // Fallback calculations for general shades
  if (normalized.startsWith('#')) {
    // Simple RGB parser to determine dominant tone
    const r = parseInt(normalized.substring(1, 3), 16) || 0;
    const g = parseInt(normalized.substring(3, 5), 16) || 0;
    const b = parseInt(normalized.substring(5, 7), 16) || 0;

    if (r > 200 && g > 200 && b > 200) return { name: 'Stark White Satin', mood: 'Brilliant reflection backdrop' };
    if (r < 30 && g < 30 && b < 30) return { name: 'Obsidian Velvet', mood: 'Deep baseline absorption' };
    if (r > 160 && g > 130 && b < 60) return { name: 'Liquid Auric Shimmer', mood: 'Metallic highlight glow' };
    if (b > r && b > g) return { name: 'Runway Twilight Violet', mood: 'Rich cool ambient shadow' };
  }

  return {
    name: 'Atelier Bespoke Tone',
    mood: 'Harmony-balanced styling'
  };
};

/**
 * Returns matching linear gradient styling parameters for hex codes
 */
export const getGradientForColor = (hex) => {
  const norm = (hex || '#0A0A0B').toUpperCase();
  if (norm === '#C9A84C' || norm === '#E8C96A') {
    return 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)';
  }
  if (norm === '#1A0A2E') {
    return 'linear-gradient(135deg, #1A0A2E 0%, #0A0A0B 100%)';
  }
  if (norm === '#F5F0E8') {
    return 'linear-gradient(135deg, #F5F0E8 0%, #EAE4D9 100%)';
  }
  return `linear-gradient(135deg, ${norm} 0%, rgba(20, 20, 25, 0.9) 100%)`;
};
