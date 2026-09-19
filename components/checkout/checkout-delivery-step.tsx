'use client';

import { useEffect, useState } from 'react';
import { Check, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getDeliveryMethods } from '@/lib/api/orders';
import { formatPrice } from '@/lib/utils/format';
import { useCheckout } from '@/lib/checkout/checkout-context';
import { cn } from '@/lib/utils/cn';
import type { DeliveryMethodDto } from '@/types/api';

export function CheckoutDeliveryStep() {
  const { deliveryMethod, setDeliveryMethod, setStep } = useCheckout();
  const [methods, setMethods] = useState<DeliveryMethodDto[]>([]);
  const [selected, setSelected] = useState<DeliveryMethodDto | null>(
    deliveryMethod,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDeliveryMethods()
      .then((data) => {
        setMethods(data);
        if (!selected && data.length > 0) setSelected(data[0]);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleContinue() {
    if (!selected) return;
    setDeliveryMethod(selected);
    setStep('Payment');
  }

  if (isLoading) {
    return (
      <div className="max-w-lg space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-3">
      {methods.map((method) => {
        const isSelected = selected?.id === method.id;

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => setSelected(method)}
            className={cn(
              'group relative flex w-full items-center gap-4 border p-4 text-left transition-all duration-300',
              'after:absolute after:inset-0 after:border after:border-transparent after:transition-all after:duration-300',
              isSelected
                ? 'border-ink-900 after:border-gold-500'
                : 'border-ink-200 hover:border-ink-400',
            )}
          >
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                isSelected
                  ? 'bg-ink-900 text-gold-400'
                  : 'bg-ink-100 text-ink-500',
              )}
            >
              <Truck className="h-4 w-4" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-ink-900">
                {method.shortName}
              </p>
              <p className="mt-0.5 text-xs text-ink-500">
                {method.description} · {method.deliveryTime}
              </p>
            </div>

            <p className="font-serif text-sm text-ink-900">
              {formatPrice(method.cost)}
            </p>

            {/* Selection check — pops in with a spring-like feel */}
            <div
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950 transition-all duration-300',
                isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
              )}
            >
              <Check className="h-3.5 w-3.5" />
            </div>
          </button>
        );
      })}

      <Button
        onClick={handleContinue}
        size="lg"
        variant="primary"
        className="mt-4 w-full"
        disabled={!selected}
      >
        Continue to Payment
      </Button>
    </div>
  );
}
