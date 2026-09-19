import { cn } from '@/lib/utils/cn';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-ink-100 text-ink-600',
  paymentreceived: 'bg-gold-500/15 text-gold-700',
  paymentfailed: 'bg-red-50 text-red-600',
  shipped: 'bg-blue-50 text-blue-600',
  delivered: 'bg-green-50 text-green-700',
};

export function OrderStatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/\s/g, '');
  const style = STATUS_STYLES[key] ?? 'bg-ink-100 text-ink-600';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
        style,
      )}
    >
      {status}
    </span>
  );
}
