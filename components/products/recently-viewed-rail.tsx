'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from './product-card';
import { useRecentlyViewedProducts } from '@/hooks/use-recently-viewed';

export function RecentlyViewedRail({ excludeId }: { excludeId?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { products, isLoading } = useRecentlyViewedProducts(excludeId);

  if (isLoading || products.length === 0) return null;

  function scrollBy(direction: 1 | -1) {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  }

  return (
    <section className="border-t border-ink-100 py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Continue Browsing" title="Recently Viewed" />

          {/* Nav arrows — quietly disappear on touch devices via hidden sm:flex */}
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scroll rail with edge fade masks — signals "more content" without arrows */}
        <div className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent"
          />

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[180px] shrink-0 snap-start sm:w-[220px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
