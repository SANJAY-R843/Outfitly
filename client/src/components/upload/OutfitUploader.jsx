import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2 } from 'lucide-react';
import { validateImageFile } from '../../services/imageService.js';

export const OutfitUploader = ({ onFileSelected, isAnalyzing = false }) => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setErrorMsg('');
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const validation = validateImageFile(file);

    if (!validation.valid) {
      setErrorMsg(validation.error);
      return;
    }

    setFileName(file.name);
    setUploaded(true);
    onFileSelected(file);
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
    disabled: isAnalyzing
  });

  return (
    <div style={{ width: '100%' }}>
      <motion.div
        {...getRootProps()}
        whileHover={!isAnalyzing ? { scale: 1.01 } : {}}
        animate={{
          borderColor: isDragActive ? '#C9A84C' : uploaded ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)',
          background: isDragActive ? 'rgba(201, 168, 76, 0.1)' : uploaded ? 'rgba(201, 168, 76, 0.02)' : 'rgba(255,255,255,0.01)',
          boxShadow: isDragActive || uploaded ? '0 0 30px rgba(201, 168, 76, 0.1)' : 'none'
        }}
        style={{
          border: '2px dashed',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s var(--transition-smooth)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <input {...getInputProps()} />

        {uploaded ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            {/* SVG checkmark draws itself */}
            <motion.svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <motion.path
                d="m22 4-10 10.01-3-3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              />
            </motion.svg>
            
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: '700' }}>
              Upload Complete
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-gold)' }}>
              {fileName}
            </p>
            {!isAnalyzing && (
              <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)', textDecoration: 'underline' }}>
                Tap to drop a different outfit
              </span>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <Upload size={28} color="var(--color-muted)" style={{ marginBottom: '4px' }} />
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.02em' }}>
              Drop your outfit photo here
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', maxWidth: '280px', margin: '0 auto' }}>
              or tap to choose from gallery
            </p>
          </div>
        )}

        {/* Dash offset animation effect overlay */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: isDragActive ? 1 : 0.6
          }}
        >
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="10"
            ry="10"
            fill="none"
            stroke="rgba(201,168,76,0.5)"
            strokeWidth="1"
            strokeDasharray="6 6"
            style={{ animation: 'dashOffset 6s linear infinite' }}
          />
        </svg>
      </motion.div>

      {errorMsg && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: '#FF5E5E',
            fontSize: '0.78rem',
            marginTop: '10px',
            fontFamily: 'var(--font-body)',
            textAlign: 'center'
          }}
        >
          {errorMsg}
        </motion.p>
      )}
    </div>
  );
};

export default OutfitUploader;
