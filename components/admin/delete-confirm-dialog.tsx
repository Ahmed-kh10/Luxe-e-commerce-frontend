'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { cn } from '@/lib/utils/cn';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  productName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  isOpen,
  productName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[110] transition-opacity duration-200',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      role="alertdialog"
      aria-modal="true"
    >
      <div onClick={onCancel} className="absolute inset-0 bg-ink-950/50" />

      <div
        ref={trapRef}
        className={cn(
          'absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-surface p-6 shadow-elevated transition-all duration-200',
          isOpen ? 'scale-100' : 'scale-95',
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <h3 className="mt-4 font-serif text-lg text-ink-900">
          Delete this product?
        </h3>
        <p className="mt-2 text-sm text-ink-500">
          <span className="font-medium text-ink-900">{productName}</span> will
          be permanently removed. This can&apos;t be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isDeleting}
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
