import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hoverEffect = true, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? { 
        y: -4, 
        borderColor: 'rgba(201, 168, 76, 0.3)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.8), 0 0 30px rgba(201, 168, 76, 0.08)'
      } : {}}
      onClick={onClick}
      className={`glass-card ${className}`}
      style={{
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* Luxury Specular Overlay Shimmer */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none'
        }}
      />
      {children}
    </motion.div>
  );
};

export default GlassCard;
