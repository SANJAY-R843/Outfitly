import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TrendChart = ({ data = [] }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const width = 320;
  const height = 160;
  const padding = 20;

  const points = useMemo(() => {
    if (!data.length) return [];
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return data.map((d, i) => {
      const divisor = data.length > 1 ? (data.length - 1) : 1;
      const x = padding + (i / divisor) * (width - padding * 2);
      const y = padding + (1 - (d.value - min) / (max - min || 1)) * (height - padding * 2);
      return { ...d, x, y };
    });
  }, [data]);

  const path = useMemo(() => {
    if (!points.length) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [points]);

  return (
    <div style={{ position: 'relative' }}>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <motion.path
          d={path}
          fill="none"
          stroke="url(#trendGradient)"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#E8C96A" />
          </linearGradient>
        </defs>

        {points.map((point, index) => (
          <motion.circle
            key={point.label}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#C9A84C"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          />
        ))}
      </svg>

      <AnimatePresence>
        {hoverIndex !== null && points[hoverIndex] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'absolute',
              top: points[hoverIndex].y - 40,
              left: points[hoverIndex].x - 20,
              background: 'rgba(10,10,11,0.85)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '0.7rem',
              color: 'var(--color-ivory)',
              pointerEvents: 'none'
            }}
          >
            {points[hoverIndex].label}: {points[hoverIndex].value}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrendChart;
