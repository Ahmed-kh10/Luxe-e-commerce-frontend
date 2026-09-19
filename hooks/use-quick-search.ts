import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api/products';
import { useDebouncedValue } from './use-debounced-value';
import type { ProductDto } from '@/types/api';

export function useQuickSearch(query: string) {
  const debouncedQuery = useDebouncedValue(query, 350);
  const [results, setResults] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      // Cancels the in-flight HTTP request when a newer search arrives.
      const controller = new AbortController();

      setIsLoading(true);

      getProducts(
        {
          searchValue: debouncedQuery,
          pageSize: 6,
          pageIndex: 1,
        },
        controller.signal,
      )
        .then((result) => {
          setResults(result.data);
        })
        .catch((error) => {
          if (
            error?.name !== 'CanceledError' &&
            error?.code !== 'ERR_CANCELED'
          ) {
            setResults([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });

      return () => {
        controller.abort();
      };
    }, 0);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  return {
    results,
    isLoading,
    hasQuery: Boolean(debouncedQuery.trim()),
  };
}
