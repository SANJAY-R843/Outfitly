import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.8 }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  const offset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: offset.x, 
        y: offset.y 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
