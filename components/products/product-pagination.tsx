'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProductPagination({
  currentPage,
  totalPages,
}: ProductPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageIndex', String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-ink-400">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => goTo(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center text-sm transition-colors',
              'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-gold-500 after:transition-all after:duration-300',
              page === currentPage
                ? 'font-semibold text-ink-900 after:w-5'
                : 'text-ink-500 hover:text-ink-900 after:w-0',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function getVisiblePages(
  current: number,
  total: number,
): (number | 'ellipsis')[] {
  const delta = 1;
  const range: (number | 'ellipsis')[] = [];
  const rangeWithDots: (number | 'ellipsis')[] = [];
  let last = 0;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (typeof i === 'number') {
      if (last && i - last > 1) {
        rangeWithDots.push('ellipsis');
      }
      rangeWithDots.push(i);
      last = i;
    }
  }

  return rangeWithDots;
}
