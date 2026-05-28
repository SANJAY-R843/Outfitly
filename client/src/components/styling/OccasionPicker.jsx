import React from 'react';
import { motion } from 'framer-motion';
import { OCCASION_LIST } from '../../utils/fashionConstants.js';
import StyleBadge from '../ui/StyleBadge.jsx';

export const OccasionPicker = ({ selectedOccasions = [], onToggle }) => {
  return (
    <div style={{ width: '100%' }}>
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        {OCCASION_LIST.map((occ) => {
          const isSelected = selectedOccasions.includes(occ.id);
          
          return (
            <StyleBadge
              key={occ.id}
              active={isSelected}
              onClick={() => onToggle(occ.id)}
            >
              {occ.name}
            </StyleBadge>
          );
        })}
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '15px'
        }}
      >
        {OCCASION_LIST.filter(occ => selectedOccasions.includes(occ.id)).map(occ => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={occ.id}
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--color-border)',
              background: 'rgba(255,255,255,0.01)',
              fontSize: '0.8rem',
              color: 'var(--color-muted)'
            }}
          >
            <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '4px' }}>
              {occ.name}
            </strong>
            {occ.desc}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OccasionPicker;
