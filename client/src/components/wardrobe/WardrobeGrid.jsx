import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WardrobeItem from './WardrobeItem.jsx';
import { CATEGORIES_LIST } from '../../utils/fashionConstants.js';

export const WardrobeGrid = ({ 
  items = [], 
  onDeleteItem, 
  onSelectItem, 
  activeOutfit = [],
  dragConstraintsRef,
  onDropToBuilder,
  onDragMove
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Category filter
  const filteredItems = items.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div style={{ width: '100%' }}>
      {/* 1. Category Pill Filter Bar */}
      <div 
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '15px',
          marginBottom: '20px',
          scrollbarWidth: 'none' // Hide default thick scrollbar
        }}
      >
        {CATEGORIES_LIST.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              border: activeCategory === cat.id ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
              background: activeCategory === cat.id ? 'rgba(201, 168, 76, 0.05)' : 'rgba(255, 255, 255, 0.01)',
              color: activeCategory === cat.id ? 'var(--color-gold)' : 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 2. Closet Grid list */}
      <AnimatePresence mode="popLayout">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '40px 10px',
              textAlign: 'center',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-muted)',
              fontSize: '0.82rem'
            }}
          >
            No items registered under "{activeCategory}" category.
          </motion.div>
        ) : (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '20px'
            }}
          >
            {filteredItems.map((item) => {
              const isSelected = activeOutfit.some(o => o.id === item.id);
              return (
                <WardrobeItem
                  key={item.id}
                  item={item}
                  onDelete={onDeleteItem}
                  onSelect={onSelectItem}
                  onDropToBuilder={onDropToBuilder}
                  onDragMove={onDragMove}
                  isSelected={isSelected}
                  dragConstraints={dragConstraintsRef}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WardrobeGrid;
