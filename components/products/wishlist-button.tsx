'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist/wishlist-context';
import { useToast } from '@/lib/toast/toast-context';
import { cn } from '@/lib/utils/cn';
import type { ProductDto } from '@/types/api';

interface WishlistButtonProps {
  product: ProductDto;
  size?: 'sm' | 'lg';
}

export function WishlistButton({ product, size = 'sm' }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const active = isWishlisted(product.id);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      active
        ? `Removed ${product.name} from wishlist`
        : `${product.name} added to wishlist`,
      active ? 'info' : 'success',
    );
  }

  return (
    <button
      type="button"
      aria-label={
        active
          ? `Remove ${product.name} from wishlist`
          : `Add ${product.name} to wishlist`
      }
      aria-pressed={active}
      onClick={handleClick}
      className={cn(
        'group/heart relative flex items-center justify-center rounded-full transition-colors duration-300',
        size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
        active
          ? 'bg-white text-red-500'
          : 'bg-white/90 text-ink-500 hover:text-red-500',
      )}
    >
      {/* Burst rings — fire only on the transition into "active" */}
      {active && (
        <>
          <span
            key={`ring-1-${product.id}`}
            aria-hidden
            className="absolute inset-0 animate-[heart-burst_0.5s_ease-out] rounded-full border-2 border-red-400"
          />
          <span
            key={`ring-2-${product.id}`}
            aria-hidden
            className="absolute inset-0 animate-[heart-burst_0.5s_ease-out_0.1s] rounded-full border-2 border-red-300"
          />
        </>
      )}

      <Heart
        className={cn(
          'relative transition-all duration-300',
          size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
          active
            ? 'scale-110 fill-red-500'
            : 'scale-100 fill-transparent group-hover/heart:scale-110',
        )}
      />
    </button>
  );
}
