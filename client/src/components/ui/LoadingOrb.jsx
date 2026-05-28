import React from 'react';
import { motion } from 'framer-motion';

export const LoadingOrb = ({ message = 'AURA is reading your style...' }) => {
  const wordTokens = Array.from(message);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '350px',
        width: '100%',
        position: 'relative',
        zIndex: 10
      }}
    >
      <motion.div
        animate={{ backdropFilter: ['blur(0px)', 'blur(6px)', 'blur(0px)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,10,11,0.4)'
        }}
      />
      {/* 3D Orb Structure Container */}
      <div 
        style={{
          position: 'relative',
          width: '160px',
          height: '160px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Central Core Pulse */}
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            boxShadow: [
              '0 0 30px rgba(201,168,76,0.3)',
              '0 0 70px rgba(201,168,76,0.6)',
              '0 0 30px rgba(201,168,76,0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #E8C96A 0%, #C9A84C 50%, #0A0A0B 100%)',
            position: 'absolute',
            zIndex: 3
          }}
        />

        {/* Orbit Ring 1 (Horizontal tilt) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '1.5px solid var(--color-gold)',
            opacity: 0.7,
            transform: 'rotateX(75deg) rotateY(15deg)',
            boxShadow: 'inset 0 0 10px rgba(201, 168, 76, 0.2)',
            zIndex: 2
          }}
        />

        {/* Orbit Ring 2 (Vertical tilt) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '1px solid var(--color-ivory)',
            opacity: 0.4,
            transform: 'rotateX(15deg) rotateY(70deg)',
            zIndex: 1
          }}
        />

        {/* Orbit Ring 3 (Diagonal tilt) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '1.2px dashed var(--color-gold-light)',
            opacity: 0.3,
            transform: 'rotateX(45deg) rotateY(-45deg)',
            zIndex: 0
          }}
        />
      </div>

      {/* Typing diagnostics feedback */}
      <motion.div 
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--color-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'flex',
          gap: '1px'
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.04 }
          }
        }}
      >
        {wordTokens.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingOrb;
