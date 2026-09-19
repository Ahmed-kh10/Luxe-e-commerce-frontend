'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import type { ProductBrandDto, ProductTypeDto } from '@/types/api';

interface ProductFiltersProps {
  brands: ProductBrandDto[];
  types: ProductTypeDto[];
}

export function ProductFilters({ brands, types }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeBrandId = searchParams.get('brandId');
  const activeTypeId = searchParams.get('typeId');

  function setParam(key: 'brandId' | 'typeId', value: number | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    params.delete('pageIndex');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const hasActiveFilters = Boolean(activeBrandId || activeTypeId);

  return (
    <aside className="space-y-10">
      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className="link-underline text-xs font-semibold uppercase tracking-wider text-gold-600"
        >
          Clear all filters
        </button>
      )}

      <FilterGroup
        title="Category"
        items={types.map((t) => ({ id: t.id, name: t.name }))}
        activeId={activeTypeId ? Number(activeTypeId) : null}
        onSelect={(id) => setParam('typeId', id)}
      />

      <FilterGroup
        title="Brand"
        items={brands.map((b) => ({ id: b.id, name: b.name }))}
        activeId={activeBrandId ? Number(activeBrandId) : null}
        onSelect={(id) => setParam('brandId', id)}
      />
    </aside>
  );
}

interface FilterGroupProps {
  title: string;
  items: { id: number; name: string }[];
  activeId: number | null;
  onSelect: (id: number | null) => void;
}

function FilterGroup({ title, items, activeId, onSelect }: FilterGroupProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="heading-accent pb-3 text-xs font-semibold uppercase tracking-widest text-ink-900">
        {title}
      </h3>
      <ul className="mt-4 space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : item.id)}
                aria-pressed={isActive}
                className={cn(
                  'group relative flex w-full items-center py-2 text-left text-sm transition-colors',
                  'before:mr-3 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:transition-all before:duration-300',
                  isActive
                    ? 'font-medium text-ink-900 before:bg-gold-500'
                    : 'text-ink-500 before:bg-transparent before:ring-1 before:ring-ink-300 hover:text-ink-900',
                )}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
