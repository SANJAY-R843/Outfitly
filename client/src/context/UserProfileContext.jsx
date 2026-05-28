import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UserProfileContext = createContext(null);
const STORAGE_KEY = 'aura_profile_v1';

const getInitialProfile = () => {
  if (typeof window === 'undefined') {
    return {
      userName: 'AURA Guest',
      bodyType: '',
      occasions: [],
      colorPreferences: ['#E8D8C4', '#C7B7A3']
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : { userName: 'AURA Guest', bodyType: '', occasions: [], colorPreferences: ['#E8D8C4', '#C7B7A3'] };
  } catch {
    return { userName: 'AURA Guest', bodyType: '', occasions: [], colorPreferences: ['#E8D8C4', '#C7B7A3'] };
  }
};

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(getInitialProfile);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates = {}) => {
    setProfile((current) => ({
      ...current,
      ...(updates.type ? { bodyType: updates.type } : {}),
      ...(updates.bodyType ? { bodyType: updates.bodyType } : {}),
      ...(updates.selectedOccasions ? { occasions: updates.selectedOccasions } : {}),
      ...(updates.occasions ? { occasions: updates.occasions } : {}),
      ...(updates.selectedColors ? { colorPreferences: updates.selectedColors } : {}),
      ...(updates.colorPreferences ? { colorPreferences: updates.colorPreferences } : {}),
      ...(updates.userName ? { userName: updates.userName } : {})
    }));
  };

  const value = useMemo(() => ({
    profile,
    userName: profile.userName,
    bodyType: profile.bodyType,
    occasions: profile.occasions,
    colorPreferences: profile.colorPreferences,
    setProfile,
    updateProfile,
    saveProfile: () => localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }), [profile]);

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return context;
};