'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductFilters } from './product-filters';
import type { ProductBrandDto, ProductTypeDto } from '@/types/api';
import { cn } from '@/lib/utils/cn';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface MobileFilterDrawerProps {
  brands: ProductBrandDto[];
  types: ProductTypeDto[];
}

export function MobileFilterDrawer({ brands, types }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <>
      {/* Trigger button — visible on mobile only */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-12 items-center gap-2 border border-ink-200 px-4 text-sm text-ink-700 transition-colors hover:border-ink-400 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          'fixed inset-0 z-50 bg-ink-950/40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Bottom sheet — slides up from the bottom, rounded top corners only */}
      <div
        ref={trapRef}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-surface shadow-elevated transition-transform duration-400 ease-out lg:hidden',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* Drag handle — purely visual affordance signaling "swipeable sheet" */}
        <div className="sticky top-0 flex justify-center bg-surface pb-2 pt-3">
          <span className="h-1 w-10 rounded-full bg-ink-200" />
        </div>

        <div className="flex items-center justify-between border-b border-ink-100 px-6 pb-4">
          <h2 className="font-serif text-lg text-ink-900">Filters</h2>
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <ProductFilters brands={brands} types={types} />
        </div>

        <div className="sticky bottom-0 border-t border-ink-100 bg-surface p-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-12 w-full bg-ink-900 text-sm font-medium text-white transition-colors hover:bg-ink-800"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
