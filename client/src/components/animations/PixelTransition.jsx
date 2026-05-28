import React from 'react';
import { motion } from 'framer-motion';

const blockVariants = {
  initial: { opacity: 0, scale: 0.85, y: 18 },
  animate: (index) => ({
    opacity: [0, 1, 0],
    scale: [0.85, 1, 1.1],
    y: [18, 0, -12],
    transition: {
      duration: 0.7,
      delay: index * 0.02,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const PixelTransition = ({ children, triggerKey }) => (
  <div style={{ position: 'relative' }} key={triggerKey}>
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 6
      }}
      initial="initial"
      animate="animate"
    >
      {Array.from({ length: 36 }).map((_, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={blockVariants}
          style={{
            aspectRatio: '1 / 1',
            borderRadius: 8,
            background: 'linear-gradient(180deg, rgba(232,216,196,0.16), rgba(109,41,50,0.08))',
            backdropFilter: 'blur(2px)'
          }}
        />
      ))}
    </motion.div>
    <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
  </div>
);

export default PixelTransition;