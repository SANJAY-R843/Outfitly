import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ColorSwatch from '../ui/ColorSwatch.jsx';

export const StyleCard = ({ suggestion, index = 0 }) => {
  const cardRef = useRef(null);

  // Framer Motion motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse coordinate ratios to degrees of rotation (-12deg to 12deg)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Relative coordinates between 0 and 1
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset rotations smoothly
    mouseX.set(0);
    mouseY.set(0);
  };

  const { title, description, occasionFit, pieces = [], styleWords = [], confidenceScore = 90 } = suggestion;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -4, boxShadow: '0 0 40px rgba(201,168,76,0.25)' }}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
        perspective: 1000,
        position: 'relative'
      }}
    >
      <div 
        className="glass-card"
        style={{
          padding: '30px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
          transform: 'translateZ(20px)',
          borderLeft: '2px solid rgba(201,168,76,0.5)'
        }}
      >
        <div>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span 
              style={{ 
                fontSize: '0.7rem', 
                color: 'var(--color-gold)', 
                fontWeight: '700', 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={12} /> {confidenceScore}% MATCH
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {styleWords.slice(0, 2).map((word, wIdx) => (
                <span 
                  key={wIdx}
                  style={{
                    fontSize: '0.62rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--color-border)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-muted)'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '8px', lineHeight: '1.3' }}>
            {title}
          </h3>
          
          <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '18px', lineHeight: '1.6' }}>
            {description}
          </p>

          <p style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontStyle: 'italic', marginBottom: '22px' }}>
            "{occasionFit}"
          </p>

          {/* Pieces list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h5 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px' }}>
              RECOMMENDED ITEMS
            </h5>
            
            {pieces.map((piece, pIdx) => (
              <div key={pIdx} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700' }}>{piece.item}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{piece.why}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px' }}>
                  <ColorSwatch hex={piece.color} showLabel={false} />
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', fontWeight: '600', marginTop: '2px' }}>{piece.brand_tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>
            {styleWords.join(' / ')}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Explore This Look {'->'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default StyleCard;
