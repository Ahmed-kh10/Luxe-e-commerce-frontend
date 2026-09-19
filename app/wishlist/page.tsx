'use client';

import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductCard } from '@/components/products/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWishlist } from '@/lib/wishlist/wishlist-context';

export default function WishlistPage() {
  const { products, isLoaded } = useWishlist();

  if (!isLoaded) {
    return (
      <Container className="py-16">
        <Skeleton className="h-9 w-48" />
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] w-full" />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="border-b border-ink-100 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Saved for Later
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-900">Your Wishlist</h1>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here for later."
          actionLabel="Explore Collection"
          actionHref="/products"
        />
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 60}ms` }}
              className="animate-[search-item-in_0.4s_ease-out_backwards]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
