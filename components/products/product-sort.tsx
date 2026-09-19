'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const SORT_OPTIONS = [
  { value: '', label: 'Relevance' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' },
];

export function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') ?? '';

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    params.delete('pageIndex');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Sort products"
        className="h-12 w-full cursor-pointer appearance-none border border-ink-200 bg-surface px-4 pr-10 text-sm text-ink-900 transition-colors hover:border-ink-400 focus:border-ink-900 focus:outline-none sm:w-56"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
    </div>
  );
}
