import { useEffect, useState } from 'react';
import { getProductById } from '@/lib/api/products';
import {
  addRecentlyViewed,
  getRecentlyViewedIds,
} from '@/lib/recently-viewed/recently-viewed-storage';
import type { ProductDto } from '@/types/api';

/** Call this on a product detail page to record the view. */
export function useTrackRecentlyViewed(productId: number) {
  useEffect(() => {
    addRecentlyViewed(productId);
  }, [productId]);
}

/** Fetches full product data for everything in the recently-viewed list,
 *  optionally excluding the product currently being viewed. */
export function useRecentlyViewedProducts(excludeId?: number) {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = getRecentlyViewedIds().filter((id) => id !== excludeId);

      if (ids.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      Promise.all(ids.map((id) => getProductById(id).catch(() => null)))
        .then((results) => {
          setProducts(results.filter((p): p is ProductDto => p !== null));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [excludeId]);

  return { products, isLoading };
}
