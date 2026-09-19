'use client';

import { Search, X } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useFilterTransition } from '@/hooks/use-filter-transition';

export function ProductSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navigate } = useFilterTransition();

  const [value, setValue] = useState(searchParams.get('search') ?? '');
  const debouncedValue = useDebouncedValue(value, 450);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue.trim()) {
      params.set('search', debouncedValue.trim());
    } else {
      params.delete('search');
    }
    params.delete('pageIndex'); // reset to page 1 on every new search

    navigate(`${pathname}?${params.toString()}`); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="group relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 transition-colors group-focus-within:text-ink-900" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="h-12 w-full border border-ink-200 bg-surface pl-11 pr-10 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-ink-900 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
