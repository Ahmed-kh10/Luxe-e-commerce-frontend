'use client';

import { useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * Tracks whether the URL search params just changed (a filter/sort/search
 * navigation is in flight) and dims the grid slightly instead of letting
 * it flash to a skeleton — the previous results stay visible and legible
 * while the new ones stream in underneath.
 */
export function ProductsGridWrapper({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [lastParams, setLastParams] = useState(searchParams.toString());

  useEffect(() => {
    const current = searchParams.toString();
    if (current !== lastParams) {
      startTransition(() => {
        setLastParams(current);
      });
    }
  }, [searchParams, lastParams]);

  return (
    <div
      className={cn(
        'transition-opacity duration-200',
        isPending ? 'pointer-events-none opacity-50' : 'opacity-100',
      )}
    >
      {children}
    </div>
  );
}
