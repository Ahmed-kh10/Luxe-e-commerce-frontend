import type { LucideIcon } from 'lucide-react';
import { PackageSearch } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon = PackageSearch,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 font-serif text-xl text-ink-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-500">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-6">
          <Button variant="outline">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
