import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const TrendCard = ({ trendItem, index = 0 }) => {
  const { item, growth, status } = trendItem || {};
  const statusColors = {
    Rising: { bg: 'rgba(201,168,76,0.15)', text: 'var(--color-gold)' },
    Peak: { bg: 'rgba(0,255,102,0.12)', text: '#00FF66' },
    Fading: { bg: 'rgba(245,240,232,0.08)', text: 'var(--color-muted)' }
  };
  const chip = statusColors[status] || statusColors.Rising;

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        padding: '20px 24px',
        background: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}>
          {item}
        </h4>
        <span style={{
          fontSize: '0.62rem',
          padding: '4px 10px',
          borderRadius: '999px',
          background: chip.bg,
          color: chip.text,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: '700'
        }}>
          {status}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <TrendingUp size={14} color="var(--color-gold)" />
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-gold)' }}>{growth}</span>
        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '999px' }}>
          <div style={{
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, #C9A84C 0%, #E8C96A 100%)',
            borderRadius: '999px'
          }} />
        </div>
      </div>

      {/* Auric ambient glow corner */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(201, 168, 76, 0.03)',
          filter: 'blur(10px)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
};

export default TrendCard;
