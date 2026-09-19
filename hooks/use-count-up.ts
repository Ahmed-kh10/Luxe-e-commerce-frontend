import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from its previous value to a new target whenever the
 * target changes — used for prices/totals so a quantity or filter change
 * feels like a smooth recalculation rather than an abrupt digit swap.
 */
export function useCountUp(target: number, durationMs = 500): number {
  const [displayValue, setDisplayValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const startTime = performance.now();

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease-out cubic — fast start, gentle settle, matching the rest of
      // the site's motion language rather than a linear count.
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(from + (target - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return displayValue;
}
