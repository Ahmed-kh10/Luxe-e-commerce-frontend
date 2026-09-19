'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { getWishlistIds, saveWishlistIds } from './wishlist-storage';
import type { ProductDto } from '@/types/api';

const CACHE_KEY = 'luxury_store_wishlist_cache';

function getCachedProducts(): Record<number, ProductDto> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCachedProducts(cache: Record<number, ProductDto>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

interface WishlistContextValue {
  ids: number[];
  products: ProductDto[];
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (product: ProductDto) => void;
  removeFromWishlist: (productId: number) => void;
  isLoaded: boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [productCache, setProductCache] = useState<Record<number, ProductDto>>(
    {},
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIds(getWishlistIds());
      setProductCache(getCachedProducts());
      setIsLoaded(true);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const isWishlisted = useCallback(
    (productId: number) => ids.includes(productId),
    [ids],
  );

  const toggleWishlist = useCallback((product: ProductDto) => {
    setIds((current) => {
      const exists = current.includes(product.id);
      const next = exists
        ? current.filter((id) => id !== product.id)
        : [...current, product.id];
      saveWishlistIds(next);
      return next;
    });

    setProductCache((current) => {
      const next = { ...current, [product.id]: product };
      saveCachedProducts(next);
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setIds((current) => {
      const next = current.filter((id) => id !== productId);
      saveWishlistIds(next);
      return next;
    });
  }, []);

  const products = ids
    .map((id) => productCache[id])
    .filter((product): product is ProductDto => Boolean(product));

  const value = useMemo(
    () => ({
      ids,
      products,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      isLoaded,
    }),
    [ids, products, isWishlisted, toggleWishlist, removeFromWishlist, isLoaded],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
