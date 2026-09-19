const KEY = 'luxury_store_recently_viewed';
const MAX_ITEMS = 8;

export function getRecentlyViewedIds(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(productId: number): number[] {
  const current = getRecentlyViewedIds().filter((id) => id !== productId);
  const next = [productId, ...current].slice(0, MAX_ITEMS);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
