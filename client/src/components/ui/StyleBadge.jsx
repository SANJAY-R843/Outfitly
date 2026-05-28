import React from 'react';
import { motion } from 'framer-motion';

export const StyleBadge = ({ children, active = false, onClick }) => {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 14px',
        fontSize: '0.78rem',
        fontWeight: '600',
        fontFamily: 'var(--font-body)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderRadius: 'var(--radius-full)',
        background: active 
          ? '#C9A84C' 
          : 'rgba(255, 255, 255, 0.04)',
        color: active ? '#0A0A0B' : 'var(--color-ivory)',
        border: active ? 'none' : '1px solid var(--color-border)',
        boxShadow: active ? '0 0 15px rgba(201, 168, 76, 0.15)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease'
      }}
    >
      {children}
    </motion.span>
  );
};

export default StyleBadge;
