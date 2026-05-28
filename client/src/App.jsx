import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import Crosshair from './components/animations/Crosshair.jsx';
import { WardrobeProvider } from './context/WardrobeContext.jsx';
import { UserProfileProvider } from './context/UserProfileContext.jsx';
import Landing from './pages/Landing.jsx';
import Profile from './pages/Profile.jsx';
import StyleAnalysis from './pages/StyleAnalysis.jsx';
import Wardrobe from './pages/Wardrobe.jsx';
import OutfitVisualizer from './pages/OutfitVisualizer.jsx';
import Trends from './pages/Trends.jsx';

const App = () => {
  const location = useLocation();

  return (
    <UserProfileProvider>
      <WardrobeProvider>
        <motion.div style={{ minHeight: '100vh', position: 'relative' }}>
          <Crosshair />
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
          <div className="grain" />
          <div className="vignette" />
        </motion.div>
      </WardrobeProvider>
    </UserProfileProvider>
  );
};

export default App;
