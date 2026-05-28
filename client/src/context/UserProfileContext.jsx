import React, { createContext, useContext, useState, useEffect } from 'react';

const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
  // Load state from localStorage on init
  const [bodyType, setBodyType] = useState(() => {
    return localStorage.getItem('aura_body_type') || '';
  });

  const [occasions, setOccasions] = useState(() => {
    const saved = localStorage.getItem('aura_occasions');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (error) {
      return [];
    }
  });

  const [colorPreferences, setColorPreferences] = useState(() => {
    const saved = localStorage.getItem('aura_colors');
    if (!saved) return ['#0A0A0B', '#C9A84C', '#F5F0E8'];
    try {
      return JSON.parse(saved);
    } catch (error) {
      return ['#0A0A0B', '#C9A84C', '#F5F0E8'];
    }
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('aura_username') || 'Sanjay';
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('aura_body_type', bodyType);
  }, [bodyType]);

  useEffect(() => {
    localStorage.setItem('aura_occasions', JSON.stringify(occasions));
  }, [occasions]);

  useEffect(() => {
    localStorage.setItem('aura_colors', JSON.stringify(colorPreferences));
  }, [colorPreferences]);

  useEffect(() => {
    localStorage.setItem('aura_username', userName);
  }, [userName]);

  const updateProfile = ({ name, type, selectedOccasions, selectedColors }) => {
    if (name !== undefined) setUserName(name);
    if (type !== undefined) setBodyType(type);
    if (selectedOccasions !== undefined) setOccasions(selectedOccasions);
    if (selectedColors !== undefined) setColorPreferences(selectedColors);
  };

  return (
    <UserProfileContext.Provider value={{
      userName,
      bodyType,
      occasions,
      colorPreferences,
      updateProfile
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be executed within an active UserProfileProvider context.');
  }
  return context;
};
