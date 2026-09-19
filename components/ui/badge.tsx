import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

type BadgeVariant = 'gold' | 'dark' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-gold-500 text-ink-950',
  dark: 'bg-ink-900 text-white',
  outline: 'border border-ink-300 text-ink-700 bg-surface/90',
};

export function Badge({ variant = 'gold', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
