import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BodyTypeSelector from '../components/styling/BodyTypeSelector.jsx';
import OccasionPicker from '../components/styling/OccasionPicker.jsx';
import ColorSwatch from '../components/ui/ColorSwatch.jsx';
import MagneticButton from '../components/ui/MagneticButton.jsx';
import { useUserProfile } from '../context/UserProfileContext.jsx';

const COLOR_OPTIONS = ['#0A0A0B', '#16161D', '#C9A84C', '#E8C96A', '#F5F0E8', '#1A0A2E'];

export const Profile = () => {
  const navigate = useNavigate();
  const { bodyType, occasions, colorPreferences, updateProfile } = useUserProfile();
  const [selectedBody, setSelectedBody] = useState(bodyType);
  const [selectedOccasions, setSelectedOccasions] = useState(occasions);
  const [selectedColors, setSelectedColors] = useState(colorPreferences);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSelectedBody(bodyType);
    setSelectedOccasions(occasions);
    setSelectedColors(colorPreferences);
  }, [bodyType, occasions, colorPreferences]);

  const toggleOccasion = (id) => {
    setSelectedOccasions((prev) => (
      prev.includes(id) ? prev.filter((occ) => occ !== id) : [...prev, id]
    ));
  };

  const toggleColor = (hex) => {
    setSelectedColors((prev) => (
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    ));
  };

  const handleSave = () => {
    const nextErrors = {};
    if (!selectedBody) nextErrors.bodyType = 'Select your body type to continue.';
    if (selectedOccasions.length === 0) nextErrors.occasions = 'Choose at least one occasion.';
    if (selectedColors.length === 0) nextErrors.colors = 'Pick at least one color preference.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      updateProfile({
        bodyType: selectedBody,
        occasions: selectedOccasions,
        colorPreferences: selectedColors
      });
      navigate('/analyze');
    }
  };

  const wheelStyle = useMemo(() => ({
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'conic-gradient(#C9A84C, #E8C96A, #F5F0E8, #1A0A2E, #0A0A0B, #C9A84C)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-deep)',
    marginBottom: '20px'
  }), []);

  return (
    <section className="page-container">
      <div style={{ marginBottom: '30px', display: 'grid', gap: '12px' }}>
        <span className="section-label">Step 1 - Profile Setup</span>
        <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.6rem)', marginTop: '8px' }}>Tell AURA about you</h2>
        <p style={{ maxWidth: '680px', color: 'var(--color-muted)', lineHeight: 1.7 }}>
          Set your silhouette, occasions, and palette so the platform can shape recommendations around your actual style signals.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>Body Type</h4>
          <BodyTypeSelector selectedType={selectedBody} onSelect={setSelectedBody} />
          {errors.bodyType && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.8rem' }}>
              {errors.bodyType}
            </motion.p>
          )}
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>Occasion Preferences</h4>
          <OccasionPicker selectedOccasions={selectedOccasions} onToggle={toggleOccasion} />
          {errors.occasions && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.8rem' }}>
              {errors.occasions}
            </motion.p>
          )}
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>Color Preferences</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            <div style={wheelStyle} />
            <div style={{ display: 'grid', gap: '12px' }}>
              {COLOR_OPTIONS.map((hex) => (
                <ColorSwatch key={hex} hex={hex} active={selectedColors.includes(hex)} onClick={() => toggleColor(hex)} />
              ))}
            </div>
          </div>
          {errors.colors && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.8rem' }}>
              {errors.colors}
            </motion.p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <MagneticButton variant="primary" onClick={handleSave}>
          Continue
        </MagneticButton>
      </div>
    </section>
  );
};

export default Profile;
