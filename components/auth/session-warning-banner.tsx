'use client';

import { Clock, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

export function SessionWarningBanner() {
  const { sessionWarning, dismissSessionWarning, logout } = useAuth();

  if (!sessionWarning) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[90] border-b border-gold-500/30 bg-ink-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 shrink-0 text-gold-400" />
          <p className="text-sm text-ink-200">
            Your session is about to expire. Please save any changes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={logout}
            className="link-underline whitespace-nowrap text-sm font-medium text-gold-400"
          >
            Sign Out Now
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismissSessionWarning}
            className="text-ink-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
