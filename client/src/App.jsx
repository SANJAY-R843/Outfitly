import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import { WardrobeProvider } from './context/WardrobeContext.jsx';
import { UserProfileProvider } from './context/UserProfileContext.jsx';
import Landing from './pages/Landing.jsx';
import Profile from './pages/Profile.jsx';
import StyleAnalysis from './pages/StyleAnalysis.jsx';
import Wardrobe from './pages/Wardrobe.jsx';
import OutfitVisualizer from './pages/OutfitVisualizer.jsx';
import Trends from './pages/Trends.jsx';

const queryClient = new QueryClient();

const PageShell = () => {
  const location = useLocation();
  const pageBackgrounds = {
    '/': 'var(--color-void)',
    '/profile': 'var(--color-deep)',
    '/analyze': 'var(--color-void)',
    '/wardrobe': 'var(--color-deep)',
    '/visualizer': 'var(--color-void)',
    '/trends': 'var(--color-deep)'
  };
  const backgroundColor = pageBackgrounds[location.pathname] || 'var(--color-void)';

  return (
    <motion.div
      animate={{ backgroundColor }}
      transition={{ duration: 0.6, ease: 'circOut' }}
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/analyze" element={<PageTransition><StyleAnalysis /></PageTransition>} />
          <Route path="/wardrobe" element={<PageTransition><Wardrobe /></PageTransition>} />
          <Route path="/visualizer" element={<PageTransition><OutfitVisualizer /></PageTransition>} />
          <Route path="/trends" element={<PageTransition><Trends /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <div className="grain-overlay" />
      <div className="ambient-glow" />
      <div className="ambient-glow-bottom" />
    </motion.div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfileProvider>
        <WardrobeProvider>
          <BrowserRouter>
            <PageShell />
          </BrowserRouter>
        </WardrobeProvider>
      </UserProfileProvider>
    </QueryClientProvider>
  );
};

export default App;
