'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { getProductById } from '@/lib/api/products';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuantitySelector } from './quantity-selector';
import { WishlistButton } from './wishlist-button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBasket } from '@/lib/basket/basket-context';
import { useToast } from '@/lib/toast/toast-context';
import { cn } from '@/lib/utils/cn';
import type { ProductDto } from '@/types/api';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface QuickViewModalProps {
  productId: number | null;
  onClose: () => void;
}

export function QuickViewModal({ productId, onClose }: QuickViewModalProps) {
  const isOpen = productId !== null;
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useBasket();
  const { showToast } = useToast();

  useEffect(() => {
    if (productId === null) return;

    const timer = setTimeout(() => {
      setIsLoading(true);
      setProduct(null);
      setQuantity(1);

      getProductById(productId)
        .then(setProduct)
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [productId]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
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

  function handleAddToBasket() {
    if (!product) return;
    addItem(product, quantity);
    showToast(`${product.name} added to your basket`, 'success');
    onClose();
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Quick view"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
      />

      <div
        ref={trapRef}
        className={cn(
          'absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 px-4 transition-all duration-300',
          isOpen
            ? '-translate-y-1/2 opacity-100'
            : '-translate-y-[calc(50%-1rem)] opacity-0',
        )}
      >
        <div className="relative grid grid-cols-1 overflow-hidden bg-surface shadow-elevated sm:grid-cols-2">
          <button
            type="button"
            aria-label="Close quick view"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-soft transition-colors hover:bg-white hover:text-ink-900"
          >
            <X className="h-4 w-4" />
          </button>

          {isLoading || !product ? (
            <>
              <Skeleton className="aspect-[4/5] w-full" />
              <div className="space-y-4 p-8">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </>
          ) : (
            <>
              {/* Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-16 w-16"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(201,162,39,0.25) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col p-8">
                {product.productBrand && (
                  <Badge variant="outline" className="w-fit">
                    {product.productBrand}
                  </Badge>
                )}

                <h2 className="mt-4 font-serif text-2xl text-ink-900">
                  {product.name}
                </h2>

                <p className="mt-2 font-serif text-xl text-ink-900">
                  {formatPrice(product.price)}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-500">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                  />
                  <WishlistButton product={product} size="lg" />
                </div>

                <Button
                  size="lg"
                  variant="primary"
                  onClick={handleAddToBasket}
                  className="mt-6 w-full"
                >
                  Add to Basket
                </Button>

                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="link-underline mt-4 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-600"
                >
                  View Full Details
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
