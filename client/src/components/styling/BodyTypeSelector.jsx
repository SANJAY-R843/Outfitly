import React from 'react';
import { motion } from 'framer-motion';
import { getBodyTypeData } from '../../utils/bodyTypeUtils.js';

export const BodyTypeSelector = ({ selectedType, onSelect }) => {
  const shapes = [
    { 
      id: 'hourglass', 
      name: 'Hourglass',
      // Symmetrical curved path
      path: 'M25 5 C35 5, 38 18, 30 22 C23 25, 23 35, 30 38 C38 42, 35 55, 25 55 C15 55, 12 42, 20 38 C27 35, 27 25, 20 22 C12 18, 15 5, 25 5 Z'
    },
    { 
      id: 'pear', 
      name: 'Pear',
      // Slender top, wider base path
      path: 'M25 8 C29 8, 28 20, 24 24 C18 30, 10 40, 12 48 C14 55, 36 55, 38 48 C40 40, 32 30, 26 24 C22 20, 21 8, 25 8 Z'
    },
    { 
      id: 'apple', 
      name: 'Apple',
      // Wider chest/torso path
      path: 'M25 6 C35 6, 38 15, 35 25 C32 35, 33 42, 31 48 C29 54, 21 54, 19 48 C17 42, 18 35, 15 25 C12 15, 15 6, 25 6 Z'
    },
    { 
      id: 'rectangle', 
      name: 'Rectangle',
      // Straight aligned path
      path: 'M20 5 L30 5 C32 15, 32 35, 30 55 L20 55 C18 35, 18 15, 20 5 Z'
    },
    { 
      id: 'inverted-triangle', 
      name: 'Inverted Triangle',
      // Wide shoulder, narrow base path
      path: 'M15 6 L35 6 C34 20, 28 35, 27 48 L23 48 C22 35, 16 20, 15 6 Z'
    }
  ];

  return (
    <div style={{ width: '100%' }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '20px',
          marginBottom: '35px'
        }}
      >
        {shapes.map((shape) => {
          const isSelected = selectedType === shape.id;
          
          return (
            <motion.div
              key={shape.id}
              onClick={() => onSelect(shape.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: isSelected ? 'rgba(201, 168, 76, 0.04)' : 'rgba(255, 255, 255, 0.01)',
                border: isSelected ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 10px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s var(--transition-smooth)',
                boxShadow: isSelected ? '0 0 25px rgba(201, 168, 76, 0.08)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              {/* Silhouette SVG Icon */}
              <svg 
                width="60" 
                height="80" 
                viewBox="0 0 50 60"
                style={{ overflow: 'visible' }}
              >
                <path
                  d={shape.path}
                  className={`silhouette-path ${isSelected ? 'selected' : ''}`}
                />
              </svg>

              <span 
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: isSelected ? 'var(--color-gold)' : 'var(--color-ivory)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {shape.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Silhouette styling detail output */}
      {selectedType && (
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          {(() => {
            const data = getBodyTypeData(selectedType);
            return (
              <>
                <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', marginBottom: '4px' }}>
                  {data.name} - {data.tagline}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '18px', lineHeight: '1.6' }}>
                  {data.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                      Atelier Guidelines (Do)
                    </h5>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--color-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {data.doList.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                      Precautions (Avoid)
                    </h5>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--color-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {data.avoidList.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default BodyTypeSelector;
