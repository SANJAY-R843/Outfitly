import React from 'react';
import { motion } from 'framer-motion';
import { resolveColorBranding } from '../../utils/colorAnalysis.js';

export const ColorSwatch = ({ hex, active = false, onClick, showLabel = true }) => {
  const branding = resolveColorBranding(hex);

  return (
    <div 
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        padding: '6px',
        borderRadius: 'var(--radius-md)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Dynamic Color Circle */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: hex,
          border: active ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
          boxShadow: active ? '0 0 15px var(--color-gold-glow)' : 'none',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {active && (
          <div 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#C9A84C',
              mixBlendMode: 'difference'
            }}
          />
        )}
      </motion.div>

      {showLabel && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span 
            style={{
              fontSize: '0.8rem',
              fontWeight: '600',
              color: 'var(--color-ivory)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em'
            }}
          >
            {branding.name}
          </span>
          <span 
            style={{
              fontSize: '0.68rem',
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)'
            }}
          >
            {hex.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
