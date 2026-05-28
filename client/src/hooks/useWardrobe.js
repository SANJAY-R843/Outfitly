import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const starterItems = [
  {
    id: 'starter-top',
    name: 'Sand Silk Shirt',
    category: 'Tops',
    color: '#E8D8C4',
    fabric: 'Silk',
    imageUrl: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'starter-bottom',
    name: 'Wine Tailored Trouser',
    category: 'Bottoms',
    color: '#6D2932',
    fabric: 'Wool Blend',
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'starter-shoe',
    name: 'Cream Loafers',
    category: 'Shoes',
    color: '#C7B7A3',
    fabric: 'Leather',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  }
];

const useWardrobeStore = create(
  persist(
    (set) => ({
      items: starterItems,
      outfits: [],
      activeOutfit: [],
      loading: false,
      error: null,
      addItem: async (item) => {
        const nextItem = { ...item, id: crypto.randomUUID(), addedAt: Date.now() };
        set((state) => ({ items: [nextItem, ...state.items] }));
        return nextItem;
      },
      removeItem: async (id) => {
        set((state) => ({
          items: state.items.filter((entry) => entry.id !== id),
          activeOutfit: state.activeOutfit.filter((entry) => entry.id !== id)
        }));
      },
      updateItem: (id, updates) => {
        set((state) => ({ items: state.items.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)) }));
      },
      addToOutfit: (item) => {
        set((state) => {
          const nextOutfit = [...state.activeOutfit.filter((entry) => entry.category !== item.category), item];
          return { activeOutfit: nextOutfit };
        });
      },
      removeFromOutfit: (id) => set((state) => ({ activeOutfit: state.activeOutfit.filter((entry) => entry.id !== id) })),
      clearOutfit: () => set({ activeOutfit: [] }),
      addOutfit: (outfit) => set((state) => ({ outfits: [{ ...outfit, id: outfit.id || crypto.randomUUID() }, ...state.outfits] }))
    }),
    { name: 'aura_wardrobe_v1' }
  )
);

export const useWardrobe = () => useWardrobeStore();
export default useWardrobeStore;