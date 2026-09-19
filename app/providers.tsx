'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider } from '@/lib/theme/theme-context';
import { AuthProvider } from '@/lib/auth/auth-context';
import { BasketProvider } from '@/lib/basket/basket-context';
import { WishlistProvider } from '@/lib/wishlist/wishlist-context';
import { ToastProvider } from '@/lib/toast/toast-context';
import { QuickViewProvider } from '@/lib/quick-view/quick-view-context';
import { ToastViewport } from '@/components/ui/toast-viewport';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BasketProvider>
            <WishlistProvider>
              <ToastProvider>
                <QuickViewProvider>{children}</QuickViewProvider>
                <ToastViewport />
              </ToastProvider>
            </WishlistProvider>
          </BasketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
