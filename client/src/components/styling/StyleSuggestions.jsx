import React from 'react';
import { motion } from 'framer-motion';
import StyleCard from './StyleCard.jsx';

export const StyleSuggestions = ({ suggestions = [] }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div style={{ width: '100%', marginTop: '30px' }}>
      <h3 
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          letterSpacing: '0.02em',
          marginBottom: '25px',
          textAlign: 'center'
        }}
        >
          AURA Recommends
        </h3>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
              }
            }
          }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '30px',
          alignItems: 'stretch'
        }}
      >
        {suggestions.map((sug, idx) => (
          <StyleCard key={idx} suggestion={sug} index={idx} />
        ))}
      </motion.div>
    </div>
  );
};

export default StyleSuggestions;
