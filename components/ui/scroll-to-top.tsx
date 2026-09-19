'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const SHOW_AFTER_PX = 600;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-white shadow-elevated transition-all duration-300',
        'hover:bg-ink-800',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      {' '}
      <ArrowUp className="h-4 w-4" />{' '}
    </button>
  );
}
