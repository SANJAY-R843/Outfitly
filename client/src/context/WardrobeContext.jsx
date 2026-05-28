import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';
import { useWardrobeStorage } from '../hooks/useWardrobe.js';

const WardrobeContext = createContext(null);

export const WardrobeProvider = ({ children }) => {
  const { items, setItems, activeOutfit, setActiveOutfit } = useWardrobeStorage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load items from API with LocalStorage caching as fallback
  useEffect(() => {
    const fetchCloset = async () => {
      try {
        setLoading(true);
        const response = await api.get('/wardrobe');
        if (response && response.success) {
          setItems(response.items);
        }
      } catch (err) {
        setError(err.message || 'Unable to load wardrobe at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchCloset();
  }, []);

  const syncOutfitToStorage = (newOutfit) => {
    setActiveOutfit(newOutfit);
  };

  const addItem = async (itemData) => {
    try {
      const response = await api.post('/wardrobe', itemData);
      if (response && response.success) {
        const updated = [response.item, ...items];
        setItems(updated);
        return response.item;
      }
      return null;
    } catch (err) {
      setError(err.message || 'Unable to add wardrobe item.');
      throw err;
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/wardrobe/${itemId}`);
      const updated = items.filter(item => item.id !== itemId);
      setItems(updated);
    } catch (err) {
      setError(err.message || 'Unable to remove wardrobe item.');
      throw err;
    }
    
    // Also remove from active outfit if selected
    if (activeOutfit.some(o => o.id === itemId)) {
      syncOutfitToStorage(activeOutfit.filter(o => o.id !== itemId));
    }
  };

  const addToOutfit = (item) => {
    // Only allow one active item per category (Outerwear, Tops, Shoes)
    const filtered = activeOutfit.filter(o => o.category !== item.category);
    const newOutfit = [...filtered, item];
    syncOutfitToStorage(newOutfit);
  };

  const removeFromOutfit = (itemId) => {
    const newOutfit = activeOutfit.filter(o => o.id !== itemId);
    syncOutfitToStorage(newOutfit);
  };

  const clearOutfit = () => {
    syncOutfitToStorage([]);
  };

  return (
    <WardrobeContext.Provider value={{
      items,
      activeOutfit,
      loading,
      error,
      addItem,
      removeItem,
      addToOutfit,
      removeFromOutfit,
      clearOutfit
    }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be executed within an active WardrobeProvider context.');
  }
  return context;
};
