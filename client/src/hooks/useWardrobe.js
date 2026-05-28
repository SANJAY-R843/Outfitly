import { useEffect, useState } from 'react';
import { useWardrobe as useWardrobeContext } from '../context/WardrobeContext.jsx';

export const useWardrobeStorage = (itemsKey = 'aura_wardrobe_items', outfitKey = 'aura_active_outfit') => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(itemsKey);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (error) {
      return [];
    }
  });

  const [activeOutfit, setActiveOutfit] = useState(() => {
    const saved = localStorage.getItem(outfitKey);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(itemsKey, JSON.stringify(items));
  }, [items, itemsKey]);

  useEffect(() => {
    localStorage.setItem(outfitKey, JSON.stringify(activeOutfit));
  }, [activeOutfit, outfitKey]);

  return { items, setItems, activeOutfit, setActiveOutfit };
};

export const useWardrobe = () => {
  return useWardrobeContext();
};
