import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-ink-100',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className,
      )}
      {...props}
    />
  );
}
