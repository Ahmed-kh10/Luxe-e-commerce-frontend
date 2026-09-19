'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticWrapperProps {
  children: ReactNode;
  /** Maximum pull distance in pixels — kept small so it reads as "alive",
   *  never as broken or jumpy. */
  strength?: number;
}

export function MagneticWrapper({
  children,
  strength = 12,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const relativeX = e.clientX - (rect.left + rect.width / 2);
    const relativeY = e.clientY - (rect.top + rect.height / 2);

    node.style.transform = `translate(${relativeX * (strength / 100)}px, ${relativeY * (strength / 100)}px)`;
  }

  function handleMouseLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = 'translate(0px, 0px)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}
