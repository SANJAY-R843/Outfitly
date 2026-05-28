import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Cpu } from 'lucide-react';

export const ImagePreview = ({ file, previewUrl, isAnalyzing = false }) => {
  const [stats, setStats] = useState({ size: '0 KB', type: 'IMAGE/JPEG' });

  useEffect(() => {
    if (file) {
      const kb = (file.size / 1024).toFixed(1);
      setStats({
        size: `${kb} KB`,
        type: file.type.toUpperCase()
      });
    }
  }, [file]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        background: 'var(--color-deep)',
        boxShadow: 'var(--shadow-deep)',
        position: 'relative'
      }}
    >
      {/* 1. Interactive preview frame */}
      <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
        <img
          src={previewUrl}
          alt="Outfit Scanned silhouette preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: isAnalyzing ? 'grayscale(30%) blur(2px)' : 'none',
            transition: 'filter 0.4s ease'
          }}
        />

        {/* Dynamic laser scan sweep overlay when server analysis is active */}
        {isAnalyzing && (
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, #00FF66 50%, rgba(0,0,0,0) 100%)',
              boxShadow: '0 0 15px #00FF66',
              animation: 'laserSweep 2s infinite linear'
            }}
          />
        )}
      </div>

      {/* 2. Technical digital dashboard overlay */}
      <div 
        style={{
          padding: '20px',
          background: 'rgba(10, 10, 11, 0.9)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Cpu size={16} color="var(--color-gold)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Analysis Source</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', fontFamily: 'var(--font-body)' }}>CLAUDE VISION</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', textTransform: 'uppercase' }}>FILE SIZE</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-ivory)' }}>{stats.size}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', textTransform: 'uppercase' }}>MIME TYPE</span>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-gold)' }}>{stats.type.split('/')[1] || 'JPEG'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImagePreview;
