import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FashionCanvas from '../components/three/FashionCanvas.jsx';
import MagneticButton from '../components/ui/MagneticButton.jsx';

const headline = 'YOUR AI FASHION INTELLIGENCE';
const words = headline.split(' ');

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'circOut' } }
};

export const Landing = () => {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <FashionCanvas />
      </div>

      <div className="page-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '680px', paddingTop: '40px' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', letterSpacing: '0.02em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'circOut' }}
            style={{
              marginTop: '18px',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              lineHeight: '1.7'
            }}
          >
            AURA blends editorial sensibility with vision intelligence to craft luxury looks tailored to your silhouette and mood.
          </motion.p>

          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginTop: '28px', display: 'inline-block' }}
          >
            <Link to="/profile">
              <MagneticButton variant="primary">Begin Your Style Journey</MagneticButton>
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginTop: '40px', color: 'var(--color-muted)', fontSize: '0.85rem' }}
          >
            Scroll
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
