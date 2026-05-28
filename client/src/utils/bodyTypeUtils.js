/**
 * Dynamic luxury guidelines mapping for body types
 */
export const BODY_TYPES_METADATA = {
  hourglass: {
    name: 'Hourglass',
    tagline: 'Balanced Symmetry & Defined Contours',
    description: 'A classic proportional silhouette where bust and hip dimensions are equal, joined by a clearly defined narrow waistline.',
    svgId: 'hourglass-silhouette',
    doList: [
      'Accentuate the natural waist narrowing with liquid gold belts.',
      'Opt for asymmetrical wrap tops and structural tailored jackets.',
      'Utilize sleek, high-rise draped trousers.'
    ],
    avoidList: [
      'Boxy, shapeless oversized outerwear that hides the core waistline.',
      'Heavy bulked ruffles directly across center-chest lines.'
    ],
    celebStyleInspo: 'Zendaya, Bella Hadid, Rihanna'
  },
  pear: {
    name: 'Pear Shape',
    tagline: 'Sculpted Hip Contours & Delicate Shoulders',
    description: 'Features hips wider than the shoulders, with a beautifully defined waist and slender shoulders/bust layers.',
    svgId: 'pear-silhouette',
    doList: [
      'Utilize strong padded shoulders to create structural balance.',
      'Pair high-contrast ivory blouses with clean, dark obsidian trousers.',
      'Introduce heavy gold collars to focus lighting accents near the face.'
    ],
    avoidList: [
      'Oversized pleated cargo pockets directly lining the hips.',
      'Low-rise horizontal stripe skirts.'
    ],
    celebStyleInspo: 'Beyoncé, Kim Kardashian, Alexa Demie'
  },
  apple: {
    name: 'Apple Shape',
    tagline: 'Fluid Torso Lines & Slender Extremities',
    description: 'An outline featuring a fuller upper chest and torso, with slender arms, shoulders, and legs.',
    svgId: 'apple-silhouette',
    doList: [
      'Select deep structural V-necks or draped cowl-neck satins.',
      'Layer with open flowing trench coats to draw long vertical silhouettes.',
      'Showcase legs with tailored ankle-cut cigarette trousers.'
    ],
    avoidList: [
      'Stiff double-breasted button structures across the chest.',
      'Elastomeric body-con knits.'
    ],
    celebStyleInspo: 'Drew Barrymore, Adele, Lizzo'
  },
  rectangle: {
    name: 'Rectangle Shape',
    tagline: 'Athletic Alignment & Clean Proportions',
    description: 'Bust, waist, and hips align in near-identical dimensions, producing an athletic, clean vertical profile.',
    svgId: 'rectangle-silhouette',
    doList: [
      'Use pleated structural details or waist cinchers to sculpt curves.',
      'Experiment with bold asymmetrical cuts (cut-out mock necks).',
      'Select high-sheen satin slip garments to catch specular reflections.'
    ],
    avoidList: [
      'Straight, monotonous shift columns without any waist definitions.',
      'Symmetric vertical stripes without mid-body hardware accents.'
    ],
    celebStyleInspo: 'Kendall Jenner, Hailey Bieber, Keira Knightley'
  },
  'inverted-triangle': {
    name: 'Inverted Triangle',
    tagline: 'Powerful Structural Shoulders & Sleek Lower Outline',
    description: 'Features shoulders noticeably wider than the hip contours, creating an architectural, athletic outline.',
    svgId: 'inverted-triangle-silhouette',
    doList: [
      'Add volume to the lower half using wide-leg or pleated silk trousers.',
      'Choose raglan sleeves, soft draped knit textures, or deep V-necks.',
      'Focus gold accessory tags around boots and hand-carried hardware.'
    ],
    avoidList: [
      'Heavy double-padded puff sleeves or epaulet blazer additions.',
      'Chunky halter collar cuts that compress shoulder widths.'
    ],
    celebStyleInspo: 'Angelina Jolie, Hunter Schafer, Cara Delevingne'
  }
};

/**
 * Returns structured metadata based on string key
 */
export const getBodyTypeData = (type) => {
  const normalized = (type || 'hourglass').toLowerCase();
  return BODY_TYPES_METADATA[normalized] || BODY_TYPES_METADATA['hourglass'];
};
