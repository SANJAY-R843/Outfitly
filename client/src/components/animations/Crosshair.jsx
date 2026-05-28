import React from 'react';

const Crosshair = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 2,
      mixBlendMode: 'screen'
    }}
  >
    <span
      style={{
        position: 'absolute',
        inset: '50% auto auto 50%',
        width: 18,
        height: 18,
        borderRadius: '9999px',
        border: '1px solid rgba(232, 216, 196, 0.45)',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 24px rgba(232, 216, 196, 0.18)'
      }}
    />
    <span
      style={{
        position: 'absolute',
        inset: '50% auto auto 50%',
        width: 1,
        height: '100vh',
        background: 'linear-gradient(180deg, rgba(232,216,196,0) 0%, rgba(232,216,196,0.18) 50%, rgba(232,216,196,0) 100%)',
        transform: 'translateX(-50%)'
      }}
    />
    <span
      style={{
        position: 'absolute',
        inset: '50% auto auto 50%',
        width: '100vw',
        height: 1,
        background: 'linear-gradient(90deg, rgba(232,216,196,0) 0%, rgba(232,216,196,0.18) 50%, rgba(232,216,196,0) 100%)',
        transform: 'translateY(-50%)'
      }}
    />
  </div>
);

export default Crosshair;