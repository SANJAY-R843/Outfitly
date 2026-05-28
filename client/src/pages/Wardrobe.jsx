import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import WardrobeGrid from '../components/wardrobe/WardrobeGrid.jsx';
import OutfitBuilder from '../components/wardrobe/OutfitBuilder.jsx';
import MagneticButton from '../components/ui/MagneticButton.jsx';
import { useWardrobe } from '../hooks/useWardrobe.js';

export const Wardrobe = () => {
  const { items, activeOutfit, addItem, removeItem, addToOutfit, removeFromOutfit, clearOutfit, loading, error } = useWardrobe();
  const builderRef = useRef(null);
  const [showAdd, setShowAdd] = useState(false);
  const [isOverBuilder, setIsOverBuilder] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tops',
    color: '#0A0A0B',
    fabric: '',
    imageUrl: ''
  });
  const [formError, setFormError] = useState('');

  const handleAddItem = async () => {
    if (!formData.name || !formData.category) {
      setFormError('Name and category are required.');
      return;
    }
    setFormError('');
    try {
      await addItem(formData);
      setShowAdd(false);
      setFormData({ name: '', category: 'Tops', color: '#0A0A0B', fabric: '', imageUrl: '' });
    } catch (err) {
      setFormError(err.message || 'Unable to add item.');
    }
  };

  const handleDropToBuilder = (item, point) => {
    if (!builderRef.current) return;
    const rect = builderRef.current.getBoundingClientRect();
    const over = point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
    if (over) {
      addToOutfit(item);
    }
    setIsOverBuilder(false);
  };

  const handleDragMove = (item, info) => {
    if (!builderRef.current) return;
    const rect = builderRef.current.getBoundingClientRect();
    const over = info.point.x >= rect.left && info.point.x <= rect.right && info.point.y >= rect.top && info.point.y <= rect.bottom;
    setIsOverBuilder(over);
  };

  return (
    <section className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="section-label">Virtual Wardrobe</span>
          <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>My Wardrobe</h2>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--color-gold)',
            color: '#0A0A0B',
            boxShadow: 'var(--shadow-gold)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Add wardrobe item"
        >
          <Plus size={20} />
        </button>
      </div>

      {error && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.85rem', marginBottom: '12px' }}>
          {error}
        </motion.p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '32px' }}>
        <div>
          {loading ? (
            <div className="glass-card" style={{ padding: '30px' }}>Loading wardrobe...</div>
          ) : (
            <WardrobeGrid
              items={items}
              activeOutfit={activeOutfit}
              onDeleteItem={removeItem}
              onSelectItem={addToOutfit}
              onDropToBuilder={handleDropToBuilder}
              onDragMove={handleDragMove}
            />
          )}
        </div>
        <div ref={builderRef}>
          <OutfitBuilder
            activeOutfit={activeOutfit}
            onRemoveItem={removeFromOutfit}
            onClearAll={clearOutfit}
            onSaveLook={() => null}
            isDragOver={isOverBuilder}
          />
        </div>
      </div>

      <div
        className="glass-card"
        style={{
          marginTop: '30px',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '0.85rem' }}>Build an Outfit</span>
        <MagneticButton variant="secondary" onClick={() => window.location.assign('/visualizer')}>
          Open Visualizer {'->'}
        </MagneticButton>
      </div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,11,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowAdd(false)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card"
            style={{ padding: '28px', width: '90%', maxWidth: '420px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: '16px' }}>Add Wardrobe Item</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                className="luxury-input"
                placeholder="Item name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                className="luxury-input"
                placeholder="Category (Outerwear, Tops, Bottoms, Shoes, Accessories)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <input
                className="luxury-input"
                placeholder="Color hex"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
              <input
                className="luxury-input"
                placeholder="Fabric"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              />
              <input
                className="luxury-input"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
            {formError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#FF5E5E', fontSize: '0.8rem', marginTop: '10px' }}>
                {formError}
              </motion.p>
            )}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <MagneticButton variant="primary" onClick={handleAddItem}>Add Item</MagneticButton>
              <MagneticButton variant="secondary" onClick={() => setShowAdd(false)}>Cancel</MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Wardrobe;
