import { useRef, useEffect } from 'react';

/**
 * Returns a React Ref that attracts the target element to the cursor position on hover.
 * Perfect for luxury call-to-actions, buttons, and navigation nodes.
 */
export const useMagneticCursor = (strength = 0.35) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate coordinates relative to center of element
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      
      // Calculate distance between mouse and center
      const distX = e.clientX - elCenterX;
      const distY = e.clientY - elCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      const magneticRadius = 80; // Proximity in pixels to trigger attraction

      if (distance < magneticRadius) {
        // Elastic pull inside boundary
        const pullX = distX * strength;
        const pullY = distY * strength;
        
        el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
        el.style.boxShadow = '0 0 25px rgba(201, 168, 76, 0.2)';
      } else {
        // Return smoothly to original position
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.boxShadow = '';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.boxShadow = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (el) {
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength]);

  return elementRef;
};
export default useMagneticCursor;
