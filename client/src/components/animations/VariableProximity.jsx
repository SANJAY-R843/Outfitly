import React, { useRef, useState } from 'react';

const VariableProximity = ({ text, className = '' }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  const handleMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const distance = Math.abs(event.clientX - centerX);
    const nextOffset = Math.max(0, 1 - distance / 220);
    setOffset(nextOffset);
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset(0)}
      className={className}
      style={{
        display: 'inline-block',
        color: 'rgba(245, 230, 214, 0.96)',
        textShadow: `0 0 ${8 + offset * 14}px rgba(232, 216, 196, ${0.12 + offset * 0.22})`,
        transform: `translateY(${offset * -2}px) scale(${1 + offset * 0.03})`,
        transition: 'transform 160ms ease, text-shadow 160ms ease'
      }}
    >
      {text}
    </span>
  );
};

export default VariableProximity;