'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Loaded only when a user actually opens Quick View — not part of the
// initial bundle every visitor downloads just to browse products.
const QuickViewModal = dynamic(
  () =>
    import('@/components/products/quick-view-modal').then(
      (m) => m.QuickViewModal,
    ),
  { ssr: false },
);

interface QuickViewContextValue {
  openQuickView: (productId: number) => void;
}

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState<number | null>(null);

  return (
    <QuickViewContext.Provider value={{ openQuickView: setProductId }}>
      {children}
      <QuickViewModal
        productId={productId}
        onClose={() => setProductId(null)}
      />
    </QuickViewContext.Provider>
  );
}

export function useQuickView(): QuickViewContextValue {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
}
