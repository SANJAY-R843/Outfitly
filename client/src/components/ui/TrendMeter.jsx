import React from 'react';
import { motion } from 'framer-motion';

export const TrendMeter = ({ label, percentage = 75, color = 'gold', delay = 0.1 }) => {
  const isGold = color === 'gold';
  
  return (
    <div style={{ marginBottom: '18px', width: '100%' }}>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.82rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontFamily: 'var(--font-body)'
        }}
      >
        <span style={{ color: 'var(--color-ivory)' }}>{label}</span>
        <span style={{ color: isGold ? 'var(--color-gold)' : 'var(--color-ivory)', fontWeight: '600' }}>
          {percentage}%
        </span>
      </div>

      {/* Base track */}
      <div 
        style={{
          height: '6px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.02)'
        }}
      >
        {/* Animated Fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            borderRadius: 'var(--radius-full)',
            background: isGold 
              ? 'linear-gradient(90deg, #C9A84C 0%, #E8C96A 100%)' 
              : 'linear-gradient(90deg, #1A0A2E 0%, #F5F0E8 100%)',
            boxShadow: isGold ? '0 0 15px rgba(201, 168, 76, 0.3)' : 'none',
            position: 'relative'
          }}
        >
          {/* Shimmer light overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0, right: 0,
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
              animation: 'laserSweep 2s infinite linear'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default TrendMeter;
