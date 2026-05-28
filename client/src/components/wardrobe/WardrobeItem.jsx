import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Sparkles } from 'lucide-react';
import ColorSwatch from '../ui/ColorSwatch.jsx';

export const WardrobeItem = ({ 
  item, 
  onDelete, 
  onSelect, 
  isSelected = false,
  dragConstraints,
  onDropToBuilder,
  onDragMove
}) => {
  const { id, name, category, color, style, fabric, imageUrl } = item;

  return (
    <motion.div
      layoutId={`wardrobe-item-${id}`}
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      whileDrag={{ 
        scale: 1.1, 
        rotate: [0, -5, 5, 0], 
        zIndex: 50,
        boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(201, 168, 76, 0.2)'
      }}
      onDrag={(event, info) => {
        if (onDragMove) {
          onDragMove(item, info);
        }
      }}
      onDragEnd={(event, info) => {
        if (onDropToBuilder) {
          onDropToBuilder(item, info.point);
        }
      }}
      style={{
        borderRadius: 'var(--radius-md)',
        border: isSelected ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
        overflow: 'hidden',
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        height: '240px',
        position: 'relative',
        touchAction: 'none', // Prevent default scrolls while dragging
        boxShadow: isSelected ? '0 0 20px rgba(201, 168, 76, 0.1)' : 'var(--shadow-deep)',
        cursor: 'grab'
      }}
    >
      {/* 1. Item Image Frame */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <img
          src={imageUrl}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          draggable="false" // Avoid native browser drag overlaps
        />

        {/* Delete Trigger */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(10, 10, 11, 0.7)',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#FF5E5E'; e.currentTarget.style.background = 'rgba(255,94,94,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.background = 'rgba(10, 10, 11, 0.7)'; }}
          >
            <Trash2 size={13} />
          </button>
        )}

        {/* Selection overlay indicator */}
        {isSelected && (
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
              color: '#0A0A0B',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.62rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={9} /> Fitted
          </div>
        )}
      </div>

      {/* 2. Details Swatch */}
      <div 
        style={{
          padding: '12px 14px',
          background: 'rgba(10,10,11,0.5)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '70%' }}>
          <span 
            style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {name}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)', textTransform: 'uppercase' }}>
            {category}
          </span>
        </div>

        {/* Quick select/fit action button */}
        {onSelect && (
          <button
            onClick={() => onSelect(item)}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: isSelected ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.02)',
              border: isSelected ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isSelected ? 'var(--color-gold)' : 'var(--color-ivory)',
              transition: 'all 0.3s ease'
            }}
          >
            <Plus size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default WardrobeItem;
