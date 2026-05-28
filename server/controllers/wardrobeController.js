// Pre-seeded luxury wardrobe items for immediate visual fidelity
let localCloset = [
  {
    id: 'seed-item-1',
    name: 'Obsidian Structural Velvet Blazer',
    category: 'Outerwear',
    color: '#0A0A0B',
    style: 'Tailored Avant-Garde',
    fabric: 'Velvet Silk Pile',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date('2026-01-15')
  },
  {
    id: 'seed-item-2',
    name: 'Electric Ivory Pleated Silk Trousers',
    category: 'Bottoms',
    color: '#F5F0E8',
    style: 'Fluid Draped Minimalist',
    fabric: 'Heavy Mulberry Silk',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date('2026-02-10')
  },
  {
    id: 'seed-item-3',
    name: 'Liquid Gold Thread Mesh Tunic',
    category: 'Tops',
    color: '#C9A84C',
    style: 'Cyberpunk Cyber-Chic',
    fabric: 'Metallic Lurex Mesh',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date('2026-03-01')
  },
  {
    id: 'seed-item-4',
    name: 'Liquid Gold Plated Cuban Boots',
    category: 'Shoes',
    color: '#C9A84C',
    style: 'Cyberpunk Luxury',
    fabric: 'Calf Leather / TPU Chrome',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date('2026-03-24')
  },
  {
    id: 'seed-item-5',
    name: 'Deep Violet Draped Satin Trench',
    category: 'Outerwear',
    color: '#1A0A2E',
    style: 'Haute Couture Editorial',
    fabric: 'Viscose Satin Crepe',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date('2026-04-12')
  }
];

/**
 * GET /api/wardrobe
 * Returns all active items
 */
export const getWardrobeItems = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      count: localCloset.length,
      items: localCloset
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/wardrobe
 * Adds a new item to the closet
 */
export const addWardrobeItem = async (req, res, next) => {
  try {
    const { name, category, color, style, fabric, imageUrl } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, error: 'Name and Category elements are required to add an item.' });
    }

    const newItem = {
      id: `custom-item-${Date.now()}`,
      name,
      category,
      color: color || '#0A0A0B',
      style: style || 'Minimalist Chic',
      fabric: fabric || 'Cotton Blend',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=400',
      createdAt: new Date()
    };

    localCloset.unshift(newItem); // Add to front of inventory

    return res.status(201).json({
      success: true,
      message: 'Item registered to digital closet.',
      item: newItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/wardrobe/:id
 * Removes an item from the closet
 */
export const removeWardrobeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const initialLength = localCloset.length;
    localCloset = localCloset.filter(item => item.id !== id);

    if (localCloset.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Item not found in digital closet.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Item removed from closet successfully.',
      removedId: id
    });
  } catch (error) {
    next(error);
  }
};
