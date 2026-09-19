import type { BasketDto } from '@/types/api';

export interface BasketTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
}

export function calculateBasketTotals(basket: BasketDto | null): BasketTotals {
  if (!basket || basket.items.length === 0) {
    return { itemCount: 0, subtotal: 0, shipping: 0, total: 0 };
  }

  const itemCount = basket.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = basket.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = basket.shippingPrice ?? 0;

  return {
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}
