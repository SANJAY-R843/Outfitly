/**
 * Centralized lists of categories, occasions, and style presets for AURA
 */

export const OCCASION_LIST = [
  { id: 'Work', name: 'Work', desc: 'Tailored silhouettes with polished restraint' },
  { id: 'Formal', name: 'Formal', desc: 'High-contrast couture for evening rooms' },
  { id: 'Casual', name: 'Casual', desc: 'Relaxed luxury with editorial balance' },
  { id: 'Sport', name: 'Sport', desc: 'Technical layers with sculpted motion' },
  { id: 'Evening', name: 'Evening', desc: 'Metallic accents under low light' },
  { id: 'Travel', name: 'Travel', desc: 'Fluid layers built for movement' }
];

export const CATEGORIES_LIST = [
  { id: 'All', name: 'All', icon: 'Sparkles' },
  { id: 'Outerwear', name: 'Outerwear', icon: 'Shield' },
  { id: 'Tops', name: 'Tops', icon: 'Shirt' },
  { id: 'Bottoms', name: 'Bottoms', icon: 'Compass' },
  { id: 'Shoes', name: 'Shoes', icon: 'Footprints' },
  { id: 'Accessories', name: 'Accessories', icon: 'Sparkles' }
];

export const PRESET_PALETTES = [
  {
    name: 'Stealth Obsidian',
    colors: ['#0A0A0B', '#0F0F13', '#16161D'],
    desc: 'Matte voids paired with deep shadows.'
  },
  {
    name: 'Auric Glow',
    colors: ['#C9A84C', '#E8C96A', '#0A0A0B'],
    desc: 'Liquid gold accents over obsidian layers.'
  },
  {
    name: 'Electric Ivory Contrast',
    colors: ['#F5F0E8', '#0A0A0B', '#1A0A2E'],
    desc: 'Stark ivory silhouettes with deep twilight backdrops.'
  }
];

export const STYLE_MOOD_WORDS = [
  'Clean',
  'Structured',
  'Modern',
  'Opulent',
  'Holographic',
  'Tailored',
  'Editorial'
];
