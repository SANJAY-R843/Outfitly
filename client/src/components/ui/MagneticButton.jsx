import React from 'react';
import { motion } from 'framer-motion';
import useMagneticCursor from '../../hooks/useMagneticCursor.js';

export const MagneticButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', // 'primary' (gold background), 'secondary' (glass/gold border)
  className = '',
  disabled = false
}) => {
  const buttonRef = useMagneticCursor(0.35); // Attract with 35% factor

  const baseStyle = {
    padding: '0 28px',
    height: '56px',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: "var(--font-body)",
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '28px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    transition: 'background 0.3s ease, border-color 0.3s ease'
  };

  const primaryStyle = {
    ...baseStyle,
    background: '#C9A84C',
    color: '#0A0A0B',
    boxShadow: '0 0 25px rgba(201, 168, 76, 0.25)',
  };

  const secondaryStyle = {
    ...baseStyle,
    background: 'transparent',
    color: 'var(--color-gold)',
    border: '1.5px solid var(--color-gold)',
    boxShadow: 'none',
  };

  const activeStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={activeStyle}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`magnetic-button ${className}`}
    >
      {/* Light glow overlay on hover */}
      {variant === 'primary' && (
        <span 
          style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          className="button-hover-shimmer"
        />
      )}
      {children}
    </motion.button>
  );
};

export default MagneticButton;
