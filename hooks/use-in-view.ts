import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fraction of the element that must be visible to trigger, 0–1. */
  threshold?: number;
  /** Only ever trigger once — the element stays "revealed" permanently. */
  triggerOnce?: boolean;
}

/**
 * Observes when an element enters the viewport using IntersectionObserver
 * — far cheaper than a scroll event listener since the browser handles
 * the calculation natively instead of us reading layout on every scroll.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who've asked for less motion — reveal immediately
    // rather than gating content behind an animation they've opted out of.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsInView(true);
      }, 0);

      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}
