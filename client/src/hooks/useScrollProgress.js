import { useState, useEffect } from 'react';

/**
 * Returns active scroll percentage (0 to 1) and raw scroll Y coordinates.
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrollY(currentScrollY);
      
      if (totalHeight > 0) {
        setScrollProgress(currentScrollY / totalHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollProgress, scrollY };
};
export default useScrollProgress;
