import { useEffect, useRef } from 'react';

const useMagneticCursor = (strength = 0.25) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const handleMove = (event) => {
      const bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const offsetX = (event.clientX - centerX) * strength;
      const offsetY = (event.clientY - centerY) * strength;

      element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      element.style.transition = 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 120ms cubic-bezier(0.16, 1, 0.3, 1)';
      element.style.boxShadow = '0 0 25px rgba(232, 216, 196, 0.16)';
    };

    const handleLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.boxShadow = 'none';
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', handleLeave);

    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
};

export default useMagneticCursor;