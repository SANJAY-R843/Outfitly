import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FashionCanvas from '../components/three/FashionCanvas.jsx';
import MagneticButton from '../components/ui/MagneticButton.jsx';
import { useWardrobe } from '../hooks/useWardrobe.js';
import { fetchVisualizationParams } from '../services/fashionAI.js';

export const OutfitVisualizer = () => {
  const { activeOutfit } = useWardrobe();
  const [showFabrics, setShowFabrics] = useState(true);
  const [accent, setAccent] = useState('#C9A84C');
  const [saved, setSaved] = useState(false);
  const [shaderParams, setShaderParams] = useState(null);
  const [visualizerPrompt, setVisualizerPrompt] = useState('');
  const [loadingShader, setLoadingShader] = useState(false);
  const [visualizerError, setVisualizerError] = useState('');

  useEffect(() => {
    if (!activeOutfit.length) {
      setShaderParams(null);
      setVisualizerPrompt('');
      return;
    }
    setLoadingShader(true);
    setVisualizerError('');
    fetchVisualizationParams(activeOutfit)
      .then((response) => {
        if (response?.success) {
          setShaderParams(response.shaderParams);
          setVisualizerPrompt(response.shaderParams.visualizerPrompt || '');
          if (response.shaderParams.secondaryColor) {
            setAccent(response.shaderParams.secondaryColor);
          }
        }
      })
      .catch((err) => setVisualizerError(err.message || 'Unable to generate visualizer prompt.'))
      .finally(() => setLoadingShader(false));
  }, [activeOutfit]);

  const saveLook = () => {
    const existing = localStorage.getItem('aura_saved_looks');
    const list = existing ? JSON.parse(existing) : [];
    list.unshift({ id: `look-${Date.now()}`, items: activeOutfit, createdAt: new Date().toISOString() });
    localStorage.setItem('aura_saved_looks', JSON.stringify(list.slice(0, 20)));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="page-container">
      <div style={{ marginBottom: '20px' }}>
        <span className="section-label">3D Visualizer</span>
        <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>Outfit Visualizer</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 0.8fr)', gap: '28px' }}>
        <div style={{ height: '480px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <FashionCanvas
            activeOutfit={activeOutfit}
            colorScheme={accent}
            showFabrics={showFabrics}
            shaderParams={shaderParams}
          />
        </div>

        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4>Controls</h4>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Accent Color</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {['#C9A84C', '#E8C96A', '#F5F0E8'].map((hex) => (
                <button
                  key={hex}
                  onClick={() => setAccent(hex)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: hex,
                    border: accent === hex ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Floating Fabrics</label>
            <div style={{ marginTop: '8px' }}>
              <MagneticButton variant="secondary" onClick={() => setShowFabrics((prev) => !prev)}>
                {showFabrics ? 'Hide Fabrics' : 'Show Fabrics'}
              </MagneticButton>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Use your cursor to rotate and scroll to zoom.
            </p>
          </div>

          {loadingShader && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              Refining material response...
            </motion.p>
          )}

          {visualizerPrompt && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              {visualizerPrompt}
            </div>
          )}

          {visualizerError && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.75rem', color: '#FF5E5E' }}>
              {visualizerError}
            </motion.p>
          )}

          <MagneticButton variant="primary" onClick={saveLook}>
            Save Look
          </MagneticButton>
          {saved && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--color-gold)', fontSize: '0.8rem' }}>
              Look saved to your wardrobe.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OutfitVisualizer;
