const BASKET_ID_KEY = 'luxury_store_basket_id';

/**
 * Returns a persistent basket ID for this browser, creating one
 * (via a real UUID) on first visit if none exists yet.
 */
export function getBasketId(): string {
  if (typeof window === 'undefined') return '';

  let id = localStorage.getItem(BASKET_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(BASKET_ID_KEY, id);
  }
  return id;
}

export function clearBasketId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(BASKET_ID_KEY);
}
