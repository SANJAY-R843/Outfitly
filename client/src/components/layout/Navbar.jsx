import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, User, Shirt, BarChart, Compass } from 'lucide-react';
import useScrollProgress from '../../hooks/useScrollProgress.js';
import useMagneticCursor from '../../hooks/useMagneticCursor.js';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScrollProgress();
  const logoRef = useMagneticCursor(0.25); // Slight magnetic pull on brand logo

  const navItems = [
    { path: '/', label: 'Home', icon: Compass },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/analyze', label: 'Analyze', icon: Sparkles },
    { path: '/wardrobe', label: 'Wardrobe', icon: Shirt },
    { path: '/visualizer', label: 'Visualizer', icon: Compass },
    { path: '/trends', label: 'Trends', icon: BarChart }
  ];

  // Dynamic style changes on scroll
  const isScrolled = scrollY > 20;
  const blurAmount = isScrolled ? 16 : 4;
  const drawerVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 }
    },
    exit: { opacity: 0, x: '100%' }
  };

  const drawerItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '5%',
          right: '5%',
          height: '70px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          borderRadius: 'var(--radius-full)',
           background: isScrolled ? 'rgba(10, 10, 11, 0.7)' : 'rgba(255, 255, 255, 0.01)',
           backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
           WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          border: isScrolled ? '1px solid var(--color-border)' : '1px solid rgba(255, 255, 255, 0.01)',
          boxShadow: isScrolled ? 'var(--shadow-deep)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease'
        }}
      >
        {/* Brand Logo */}
        <Link 
          to="/" 
          ref={logoRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-ivory)'
          }}
        >
           <span className="gold-text">A</span>URA
         </Link>

        {/* Desktop Navigation Link Array */}
        <div 
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '30px'
          }}
          className="desktop-nav-items"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial="rest"
                whileHover="hover"
                animate="rest"
                style={{ position: 'relative' }}
              >
                <Link
                  to={item.path}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-gold)' : 'var(--color-muted)',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item.label}
                </Link>
                <motion.span
                  variants={{
                    rest: { scaleX: isActive ? 1 : 0, originX: 0 },
                    hover: { scaleX: 1, originX: 0 }
                  }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'var(--color-gold)',
                    boxShadow: '0 0 10px rgba(201, 168, 76, 0.5)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Hamburger menu */}
        <div 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-hamburger-trigger"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '300px',
              height: '100vh',
              background: 'rgba(10, 10, 11, 0.95)',
              backdropFilter: 'blur(30px) saturate(180%)',
              borderLeft: '1px solid var(--color-border)',
              zIndex: 998,
              padding: '120px 40px 40px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: 'var(--shadow-deep)'
            }}
          >
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.path} variants={drawerItemVariants}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: '600',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--color-gold)' : 'var(--color-ivory)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    }}
                  >
                    <IconComp size={18} color={isActive ? 'var(--color-gold)' : 'var(--color-muted)'} />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Helper to display/hide items responsively without Tailwind */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-items {
            display: flex !important;
          }
          .mobile-hamburger-trigger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
