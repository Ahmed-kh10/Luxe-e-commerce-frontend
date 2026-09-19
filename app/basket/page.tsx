'use client';

import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { BasketItemRow } from '@/components/basket/basket-item-row';
import { BasketSummary } from '@/components/basket/basket-summary';
import { Skeleton } from '@/components/ui/skeleton';
import { useBasket } from '@/lib/basket/basket-context';

export default function BasketPage() {
  const { basket, totals, isLoading } = useBasket();

  if (isLoading) {
    return (
      <Container className="py-16">
        <Skeleton className="h-9 w-48" />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-32 w-28" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      </Container>
    );
  }

  const isEmpty = !basket || basket.items.length === 0;

  return (
    <Container className="py-16">
      <div className="border-b border-ink-100 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Your Selection
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-900">Basket</h1>
      </div>

      {isEmpty ? (
        <EmptyState
          title="Your basket is empty"
          description="Explore the collection and find something you'll love."
          actionLabel="Start Shopping"
          actionHref="/products"
        />
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            {basket.items.map((item) => (
              <BasketItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <BasketSummary totals={totals} />
          </div>
        </div>
      )}
    </Container>
  );
}
