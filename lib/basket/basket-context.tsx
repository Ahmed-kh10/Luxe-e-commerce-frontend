'use client';

import {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { getBasket, saveBasket, deleteBasket } from '@/lib/api/basket';
import { getBasketId } from './basket-id';
import { calculateBasketTotals, type BasketTotals } from './totals';
import type { BasketDto, BasketItemDto, ProductDto } from '@/types/api';

interface BasketContextValue {
  basket: BasketDto | null;
  totals: BasketTotals;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (product: ProductDto, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  setDeliveryMethod: (deliveryMethodId: number) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextValue | null>(null);

const SYNC_DEBOUNCE_MS = 600;

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const basketIdRef = useRef<string>('');

  // Load existing basket on first mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const basketId = getBasketId();
      basketIdRef.current = basketId;

      getBasket(basketId)
        .then((existing) => {
          setBasket(existing);
        })
        .catch(() => {
          // No basket yet on the server.
          setBasket({
            id: basketId,
            items: [],
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup pending sync timeout on unmount
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  // Debounced sync to backend
  const scheduleSync = useCallback((nextBasket: BasketDto) => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(async () => {
      setIsSyncing(true);

      try {
        await saveBasket(nextBasket);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[Basket] Sync failed:', error);
        }
      } finally {
        setIsSyncing(false);
      }
    }, SYNC_DEBOUNCE_MS);
  }, []);

  // Add item or increase quantity
  const addItem = useCallback(
    (product: ProductDto, quantity: number = 1) => {
      setBasket((current) => {
        const base: BasketDto = current ?? {
          id: basketIdRef.current,
          items: [],
        };

        const existingIndex = base.items.findIndex(
          (item) => item.id === product.id,
        );

        let nextItems: BasketItemDto[];

        if (existingIndex >= 0) {
          nextItems = base.items.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item,
          );
        } else {
          const newItem: BasketItemDto = {
            id: product.id,
            productName: product.name,
            price: product.price,
            quantity,
            pictureUrl: product.pictureUrl,
            brand: product.productBrand,
            type: product.productType,
          };

          nextItems = [...base.items, newItem];
        }

        const next: BasketDto = {
          ...base,
          items: nextItems,
        };

        scheduleSync(next);

        return next;
      });
    },
    [scheduleSync],
  );

  // Remove item entirely
  const removeItem = useCallback(
    (itemId: number) => {
      setBasket((current) => {
        if (!current) {
          return current;
        }

        const next: BasketDto = {
          ...current,
          items: current.items.filter((item) => item.id !== itemId),
        };

        scheduleSync(next);

        return next;
      });
    },
    [scheduleSync],
  );

  // Update quantity
  const updateQuantity = useCallback(
    (itemId: number, quantity: number) => {
      setBasket((current) => {
        if (!current) {
          return current;
        }

        const nextItems =
          quantity <= 0
            ? current.items.filter((item) => item.id !== itemId)
            : current.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity,
                    }
                  : item,
              );

        const next: BasketDto = {
          ...current,
          items: nextItems,
        };

        scheduleSync(next);

        return next;
      });
    },
    [scheduleSync],
  );

  // Set delivery method on the basket itself, so the backend has it
  // when computing the PaymentIntent amount.
  const setDeliveryMethod = useCallback(
    (deliveryMethodId: number) => {
      setBasket((current) => {
        if (!current) return current;
        const next: BasketDto = { ...current, deliveryMethodId };
        scheduleSync(next);
        return next;
      });
    },
    [scheduleSync],
  );

  // Clear entire basket
  const clearBasket = useCallback(() => {
    const basketId = basketIdRef.current;

    setBasket({
      id: basketId,
      items: [],
    });

    deleteBasket(basketId).catch(() => {
      // Best effort.
    });
  }, []);

  const totals = useMemo(() => calculateBasketTotals(basket), [basket]);

  const value = useMemo(
    () => ({
      basket,
      totals,
      isLoading,
      isSyncing,
      addItem,
      removeItem,
      updateQuantity,
      setDeliveryMethod,
      clearBasket,
    }),
    [
      basket,
      totals,
      isLoading,
      isSyncing,
      addItem,
      removeItem,
      updateQuantity,
      setDeliveryMethod,
      clearBasket,
    ],
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

export function useBasket(): BasketContextValue {
  const context = useContext(BasketContext);

  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }

  return context;
}
