'use client';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  /** Stagger delay in milliseconds — pass an increasing value across a
   *  list of siblings to create a cascading reveal instead of a flat one. */
  delayMs?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delayMs = 0,
  className,
}: RevealOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delayMs}ms` : '0ms' }}
      className={cn(
        'transition-all duration-700 ease-out',
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}
