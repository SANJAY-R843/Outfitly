import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useMagneticCursor from '../../hooks/useMagneticCursor.js';
import VariableProximity from '../animations/VariableProximity.jsx';

const links = [
  { path: '/profile', label: 'Profile' },
  { path: '/analyze', label: 'Analyze' },
  { path: '/wardrobe', label: 'Wardrobe' },
  { path: '/visualizer', label: 'Visualizer' },
  { path: '/trends', label: 'Trends' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], ['blur(8px)', 'blur(18px)']);
  const opacity = useTransform(scrollY, [0, 120], [0.5, 0.92]);
  const springOpacity = useSpring(opacity, { stiffness: 120, damping: 20 });
  const brand = useMagneticCursor(0.25);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <motion.header
        style={{
          backdropFilter: blur,
          opacity: springOpacity,
          background: 'rgba(58, 16, 24, 0.55)',
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: 'min(calc(100% - 1.5rem), 1120px)',
          borderRadius: '9999px',
          border: '1px solid rgba(237, 219, 202, 0.15)',
          padding: '14px 20px',
          boxShadow: '0 12px 50px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <Link ref={brand} to="/" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.28em', color: 'var(--color-ivory)' }}>
            <VariableProximity text="AURA" />
          </Link>

          <nav style={{ display: 'none', alignItems: 'center', gap: '24px' }} className="aura-desktop-nav">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  position: 'relative',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  fontSize: '0.78rem',
                  color: isActive ? 'var(--color-ivory)' : 'rgba(245, 240, 232, 0.66)',
                  transition: 'color 180ms ease'
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 9999, border: '1px solid rgba(237, 219, 202, 0.14)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-ivory)' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 40, width: 'min(84vw, 320px)', borderLeft: '1px solid rgba(237, 219, 202, 0.15)', background: 'rgba(58, 16, 24, 0.96)', padding: '112px 24px 24px' }}
          >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {links.map((item) => (
                  <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)' }}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
