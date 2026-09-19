import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus inside a container while it's open, and
 * restores focus to whatever triggered it once it closes — the two
 * things every accessible modal/drawer needs and the two things that
 * are easiest to forget.
 */
export function useFocusTrap<T extends HTMLElement>(isOpen: boolean) {
  const containerRef = useRef<T | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Remember what had focus before opening, so we can return it later —
    // this is what makes closing a modal feel seamless instead of dumping
    // keyboard focus back at the top of the page.
    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Move focus into the panel itself the moment it opens.
    const focusables =
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !container) return;

      const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus to the trigger element — the "magic" detail most
      // sites skip, leaving keyboard users disoriented after closing.
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  return containerRef;
}
