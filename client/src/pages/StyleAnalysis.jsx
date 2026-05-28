import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OutfitUploader from '../components/upload/OutfitUploader.jsx';
import ImagePreview from '../components/upload/ImagePreview.jsx';
import StyleSuggestions from '../components/styling/StyleSuggestions.jsx';
import LoadingOrb from '../components/ui/LoadingOrb.jsx';
import MagneticButton from '../components/ui/MagneticButton.jsx';
import FashionCanvas from '../components/three/FashionCanvas.jsx';
import { createImagePreviewUrl, revokeImagePreviewUrl } from '../services/imageService.js';
import { useAI } from '../hooks/useAI.js';
import { useUserProfile } from '../context/UserProfileContext.jsx';

export const StyleAnalysis = () => {
  const { bodyType, occasions, colorPreferences, userName } = useUserProfile();
  const { analyzing, analysisResult, runOutfitAnalysis, error } = useAI();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (!file) return;
    const url = createImagePreviewUrl(file);
    setPreviewUrl(url);
    return () => revokeImagePreviewUrl(url);
  }, [file]);

  const handleAnalyze = async () => {
    if (!file) {
      setActionError('Upload an outfit photo to analyze.');
      return;
    }
    setActionError('');
    try {
      await runOutfitAnalysis(file, bodyType || 'hourglass', occasions[0] || 'Casual', {
        colors: colorPreferences,
        occasions,
        userName
      });
    } catch (err) {
      setActionError(err.message || 'Unable to analyze this outfit.');
    }
  };

  return (
    <section className="page-container">
      <div style={{ display: 'grid', gap: '40px' }}>
        <div style={{ display: 'grid', gap: '10px' }}>
          <span className="section-label">Style Analysis</span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', marginTop: '8px' }}>Analyze Outfit</h2>
          <p style={{ maxWidth: '720px', color: 'var(--color-muted)', lineHeight: 1.7 }}>
            Scan a look, then let AURA translate the composition into style notes, palette guidance, and next-step suggestions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <OutfitUploader onFileSelected={setFile} isAnalyzing={analyzing} />
            {actionError && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.8rem', marginTop: '10px' }}>
                {actionError}
              </motion.p>
            )}

            <div style={{ marginTop: '20px' }}>
              <MagneticButton onClick={handleAnalyze} variant="primary">
                Analyze with AURA
              </MagneticButton>
            </div>
          </div>

          <div style={{ minHeight: '320px' }}>
            {previewUrl && (
              <ImagePreview file={file} previewUrl={previewUrl} isAnalyzing={analyzing} />
            )}
            {!previewUrl && (
              <div className="glass-card" style={{ padding: '30px', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                  Upload a look to preview the scan.
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'relative', height: '360px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <FashionCanvas isScanning={analyzing} showFabrics />
        </div>

        {analyzing && <LoadingOrb />}

        {error && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.85rem' }}>
            {error}
          </motion.p>
        )}

        {analysisResult?.analysis && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Style Analysis</h3>
              <span style={{ padding: '6px 12px', borderRadius: '999px', background: 'var(--color-gold)', color: '#0A0A0B', fontWeight: 700 }}>
                Style Score: {analysisResult.analysis.styleScore}/10
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {(analysisResult.analysis.detectedItems || []).map((item) => (
                <span key={item.item} style={{ padding: '6px 12px', borderRadius: '999px', background: 'var(--color-glass)', border: '1px solid var(--color-border)', fontSize: '0.75rem' }}>
                  {item.item}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              {(analysisResult.analysis.colorPalette || []).slice(0, 5).map((hex) => (
                <div key={hex} style={{ width: '28px', height: '28px', borderRadius: '50%', background: hex, border: '1px solid var(--color-border)' }} />
              ))}
            </div>

            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
              <div className="glass-card" style={{ padding: '16px' }}>
                <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-ivory)' }}>Strengths</h5>
                <ul style={{ marginTop: '10px', paddingLeft: '16px', color: 'var(--color-muted)', fontSize: '0.8rem', display: 'grid', gap: '6px' }}>
                  {(analysisResult.analysis.strengths || []).map((strength) => (
                    <li key={strength}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="glass-card" style={{ padding: '16px' }}>
                <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-ivory)' }}>Improvements</h5>
                <ul style={{ marginTop: '10px', paddingLeft: '16px', color: 'var(--color-muted)', fontSize: '0.8rem', display: 'grid', gap: '6px' }}>
                  {(analysisResult.analysis.improvements || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {analysisResult?.stylingConsultation && (
          <StyleSuggestions suggestions={analysisResult.stylingConsultation} />
        )}

        {analysisResult?.analysis?.bodyRecommendations && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Body Type Guidance</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {(analysisResult.analysis.bodyRecommendations.doList || []).slice(0, 3).map((item) => (
                <div key={item} style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>{item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StyleAnalysis;
