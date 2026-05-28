import React from 'react';
import { motion } from 'framer-motion';
import PixelTransition from '../animations/PixelTransition.jsx';

const variants = {
  initial: { opacity: 0, y: 48, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] }
  }
};

const PageTransition = ({ children }) => (
  <PixelTransition triggerKey={typeof window === 'undefined' ? 'ssr' : window.location.pathname}>
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" style={{ width: '100%' }}>
      {children}
    </motion.div>
  </PixelTransition>
);

export default PageTransition;
