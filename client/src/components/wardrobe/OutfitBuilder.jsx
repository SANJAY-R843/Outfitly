import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Sparkles, Shirt, Footprints, Shield } from 'lucide-react';

export const OutfitBuilder = ({ 
  activeOutfit = [], 
  onRemoveItem, 
  onClearAll, 
  onSaveLook,
  isDragOver = false
}) => {
  const categories = [
    { id: 'Outerwear', name: 'Outerwear Layer', icon: Shield },
    { id: 'Tops', name: 'Top Layer', icon: Shirt },
    { id: 'Bottoms', name: 'Bottoms', icon: Shirt },
    { id: 'Shoes', name: 'Footwear Anchor', icon: Footprints }
  ];

  return (
    <motion.div
      className="glass-card animate-pulse-glow"
      animate={isDragOver ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      transition={{ duration: 0.6, repeat: isDragOver ? Infinity : 0, ease: 'easeInOut' }}
      style={{
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        justifyContent: 'space-between',
        borderColor: isDragOver ? 'rgba(201,168,76,0.5)' : 'var(--color-border)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>
            Outfit Composer
          </h3>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', fontWeight: '700', letterSpacing: '0.05em' }}>
            3D ATELIER READY
          </span>
        </div>
        
        <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
          Select or drag elements from your closet inventory directly into active styling slots below.
        </p>

        {/* Builder composition slots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map((cat) => {
            const slottedItem = activeOutfit.find(o => o.category.toLowerCase() === cat.id.toLowerCase());
            const IconComp = cat.icon;

            return (
              <div 
                key={cat.id}
                style={{
                  height: '84px',
                  borderRadius: 'var(--radius-md)',
                  border: slottedItem ? '1.5px solid var(--color-gold)' : '1px dashed var(--color-border)',
                  background: slottedItem ? 'rgba(20,20,25,0.4)' : isDragOver ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.01)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 18px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {slottedItem ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slottedItem.id}
                      layoutId={`wardrobe-item-${slottedItem.id}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        zIndex: 2
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={slottedItem.imageUrl} 
                          alt={slottedItem.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700' }}>{slottedItem.name}</span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--color-gold)' }}>{slottedItem.fabric}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(slottedItem.id)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--color-muted)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FF5E5E'; e.currentTarget.style.borderColor = 'rgba(255,94,94,0.3)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--color-muted)' }}>
                    <div 
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255,255,255,0.02)',
                        background: 'rgba(255,255,255,0.01)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComp size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-ivory)' }}>{cat.name}</span>
                      <span style={{ fontSize: '0.68rem' }}>Slot Unassigned</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dock action triggers */}
      {activeOutfit.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {onSaveLook && (
            <button
              onClick={onSaveLook}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
                color: '#0A0A0B',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                boxShadow: '0 0 25px rgba(201, 168, 76, 0.25)'
              }}
            >
              <Sparkles size={14} /> Refit on 3D Mannequin
            </button>
          )}

          <button
            onClick={onClearAll}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.01)',
              color: 'var(--color-muted)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              border: '1px solid var(--color-border)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            Clear Active Selection
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default OutfitBuilder;
