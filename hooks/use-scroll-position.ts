import { useEffect, useRef, useState } from 'react';

/** Returns the current vertical scroll position, throttled to animation
 *  frames instead of firing on every scroll event (which can fire dozens
 *  of times per frame on a fast trackpad or momentum scroll). */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        tickingRef.current = false;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
