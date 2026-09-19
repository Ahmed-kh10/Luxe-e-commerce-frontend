'use client';

import { useTrackRecentlyViewed } from '@/hooks/use-recently-viewed';

export function ViewTracker({ productId }: { productId: number }) {
  useTrackRecentlyViewed(productId);
  return null;
}
