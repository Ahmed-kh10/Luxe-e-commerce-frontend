'use client';

import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useToast, type ToastVariant } from '@/lib/toast/toast-context';
import { cn } from '@/lib/utils/cn';

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; accent: string }
> = {
  success: {
    icon: CheckCircle2,
    accent: 'border-l-gold-500',
  },
  error: {
    icon: XCircle,
    accent: 'border-l-red-500',
  },
  info: {
    icon: Info,
    accent: 'border-l-ink-500',
  },
};

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3"
    >
      {toasts.map((toast) => {
        const { icon: Icon, accent } = VARIANT_CONFIG[toast.variant];

        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              'pointer-events-auto flex items-start gap-3 border-l-4 bg-obsidian-950 p-4 pr-10 shadow-elevated',
              'animate-[toast-in_0.4s_cubic-bezier(0.16,1,0.3,1)]',
              accent,
            )}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />

            <p className="text-sm text-white">{toast.message}</p>

            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
              className="absolute right-3 top-3 text-ink-400 transition-colors hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
