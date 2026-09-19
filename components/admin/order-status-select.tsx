'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { updateOrderStatus } from '@/lib/api/admin-orders';
import { useToast } from '@/lib/toast/toast-context';
import { cn } from '@/lib/utils/cn';

const STATUS_OPTIONS = ['Pending', 'PaymentReceived', 'Shipped', 'Delivered'];

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
  onUpdated: (newStatus: string) => void;
}

export function OrderStatusSelect({
  orderId,
  currentStatus,
  onUpdated,
}: OrderStatusSelectProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const { showToast } = useToast();

  async function handleChange(newStatus: string) {
    if (newStatus === currentStatus) return;

    setIsSaving(true);
    try {
      await updateOrderStatus(orderId, newStatus);
      onUpdated(newStatus);
      setJustSaved(true);
      showToast(`Order status updated to ${newStatus}`, 'success');
      setTimeout(() => setJustSaved(false), 1500);
    } catch {
      showToast('Failed to update order status', 'error');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isSaving}
        className={cn(
          'h-9 border bg-transparent px-3 text-xs font-medium uppercase tracking-wide outline-none transition-colors',
          'border-ink-200 text-ink-700 focus:border-ink-900',
        )}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {isSaving && (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-400" />
      )}
      {justSaved && <Check className="h-3.5 w-3.5 text-gold-600" />}
    </div>
  );
}
