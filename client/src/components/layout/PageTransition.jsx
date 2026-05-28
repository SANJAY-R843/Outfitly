import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
      transition={{ 
        duration: 0.6, 
        ease: 'circOut'
      }}
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        position: 'relative'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
