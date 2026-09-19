'use client';

import Link from 'next/link';
import { Check, Eye, ShoppingBag } from 'lucide-react';
import { memo, useState, useRef, useEffect } from 'react';

import type { ProductDto } from '@/types/api';
import { formatPrice } from '@/lib/utils/format';
import { Badge } from '@/components/ui/badge';
import { SmartImage } from '@/components/ui/smart-image';
import { WishlistButton } from '@/components/products/wishlist-button';
import { useBasket } from '@/lib/basket/basket-context';
import { useToast } from '@/lib/toast/toast-context';
import { useQuickView } from '@/lib/quick-view/quick-view-context';

interface ProductCardProps {
  product: ProductDto;
  priority?: boolean;
}

function ProductCardComponent({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100">
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-ink-900 opacity-0 shadow-elevated transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:flex"
          style={{
            background:
              'linear-gradient(135deg, transparent 50%, rgba(201,162,39,0.35) 50%)',
          }}
        />

        <SmartImage
          src={product.pictureUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          fallbackClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {product.productBrand && (
            <Badge variant="outline" className="backdrop-blur-sm">
              {product.productBrand}
            </Badge>
          )}
        </div>

        <div className="absolute right-3 top-3 z-20">
          <WishlistButton product={product} />
        </div>

        {/* Quick-add + Quick-view buttons */}
        <QuickViewButton productId={product.id} />
        <QuickAddButton product={product} />
      </div>

      {/* Product info */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-1 text-sm font-medium text-ink-900">
          {product.name}
        </h3>

        <p className="mt-1 text-xs uppercase tracking-wide text-ink-400">
          {product.productType}
        </p>

        <p className="mt-2 font-serif text-lg text-ink-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

function QuickAddButton({ product }: { product: ProductDto }) {
  const { addItem } = useBasket();
  const { showToast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending "reset the checkmark" timer if the card unmounts
  // (e.g. the user navigates away right after clicking) — prevents a
  // setState call on an unmounted component.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, 1);
    showToast(`${product.name} added to your basket`, 'success');

    setIsAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      aria-label={`Add ${product.name} to basket`}
      onClick={handleClick}
      className="pointer-events-none absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-ink-900 opacity-0 shadow-elevated transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:flex"
    >
      {isAdded ? (
        <Check className="h-4 w-4 text-gold-600" />
      ) : (
        <ShoppingBag className="h-4 w-4" />
      )}
    </button>
  );
}

function QuickViewButton({ productId }: { productId: number }) {
  const { openQuickView } = useQuickView();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    openQuickView(productId);
  }

  return (
    <button
      type="button"
      aria-label="Quick view"
      onClick={handleClick}
      className="pointer-events-none absolute bottom-3 left-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-ink-900 opacity-0 shadow-elevated transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
    >
      <Eye className="h-4 w-4" />
    </button>
  );
}

export const ProductCard = memo(ProductCardComponent);
