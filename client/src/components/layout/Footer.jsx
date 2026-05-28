import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer 
      style={{
        background: 'var(--color-void)',
        borderTop: '1px solid var(--color-border)',
        padding: '60px 5% 40px 5%',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px'
        }}
      >
        <div style={{ maxWidth: '300px' }}>
          <h4 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}
          >
            AURA
          </h4>
          <p 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--color-muted)',
              lineHeight: '1.6'
            }}
          >
            A luxury fashion intelligence platform powered by Gemini vision + text models. Editorial-grade styling and coffee-toned runway insight.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Navigation</span>
            <Link to="/profile" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Identity</Link>
            <Link to="/analyze" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Consultation</Link>
            <Link to="/wardrobe" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Closet</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Atelier</span>
            <Link to="/visualizer" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>3D Canvas</Link>
            <Link to="/trends" style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Runway Trends</Link>
          </div>
        </div>
      </div>

      <div 
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'var(--color-muted)',
          fontFamily: 'var(--font-body)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        <span>(c) 2026 AURA Fashion Intelligence. All rights reserved.</span>
         <span>Obsidian & Liquid Gold Edition</span>
      </div>
    </footer>
  );
};

export default Footer;
