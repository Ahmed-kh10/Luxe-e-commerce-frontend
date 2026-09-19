'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';

import { useQuickSearch } from '@/hooks/use-quick-search';
import { formatPrice } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const { results, isLoading, hasQuery } = useQuickSearch(query);

  // Autofocus the input when the overlay opens. Clear the query once it closes.
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isOpen) {
          setQuery('');
          return;
        }
        inputRef.current?.focus();
      },
      isOpen ? 100 : 0,
    );

    return () => clearTimeout(timeout);
  }, [isOpen]);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  function goToProduct(id: number) {
    router.push(`/products/${id}`);
    onClose();
  }

  function goToFullSearch() {
    router.push(`/products?search=${encodeURIComponent(query)}`);
    onClose();
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={trapRef}
        className={cn(
          'absolute left-1/2 top-24 w-full max-w-xl -translate-x-1/2 px-4 transition-all duration-300',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
        )}
      >
        <div className="overflow-hidden bg-surface shadow-elevated">
          {/* Search input row */}
          <div className="flex items-center gap-3 border-b border-ink-100 px-5">
            {isLoading ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-ink-400" />
            ) : (
              <Search className="h-4 w-4 shrink-0 text-ink-400" />
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  goToFullSearch();
                }
              }}
              placeholder="Search for products..."
              aria-label="Search products"
              className="h-14 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
            />

            <button
              type="button"
              aria-label="Close search"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          {hasQuery && (
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 && !isLoading ? (
                <div className="px-5 py-10 text-center text-sm text-ink-500">
                  No products found for “{query}”
                </div>
              ) : (
                <ul>
                  {results.map((product, index) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => goToProduct(product.id)}
                        style={{ animationDelay: `${index * 40}ms` }}
                        className="group flex w-full animate-[search-item-in_0.3s_ease-out_backwards] items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-ink-50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.pictureUrl}
                          alt=""
                          className="h-12 w-10 shrink-0 bg-ink-100 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-ink-900">
                            {product.name}
                          </p>

                          <p className="text-xs text-ink-400">
                            {product.productBrand}
                          </p>
                        </div>

                        <span className="shrink-0 font-serif text-sm text-ink-900">
                          {formatPrice(product.price)}
                        </span>

                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {results.length > 0 && (
                <button
                  type="button"
                  onClick={goToFullSearch}
                  className="w-full border-t border-ink-100 px-5 py-3 text-center text-xs font-medium uppercase tracking-wide text-gold-600 hover:bg-ink-50"
                >
                  See all results for “{query}”
                </button>
              )}
            </div>
          )}

          {/* Empty state */}
          {!hasQuery && (
            <div className="px-5 py-10 text-center text-xs text-ink-400">
              Start typing to search the collection
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
