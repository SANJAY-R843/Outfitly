import React, { createContext, useContext } from 'react';
import useWardrobeStore from '../hooks/useWardrobe.js';

const WardrobeContext = createContext(null);

export const WardrobeProvider = ({ children }) => {
  const store = useWardrobeStore();
  return <WardrobeContext.Provider value={store}>{children}</WardrobeContext.Provider>;
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  return context || useWardrobeStore();
};