import { Check, Package, Truck, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const TIMELINE_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: Package },
  { key: 'paymentreceived', label: 'Payment Confirmed', icon: Check },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
] as const;

export function OrderTimeline({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase().replace(/\s/g, '');
  const currentIndex = TIMELINE_STEPS.findIndex(
    (step) => step.key === normalizedStatus,
  );
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="flex items-start">
      {TIMELINE_STEPS.map((step, index) => {
        const isCompleted = index <= activeIndex;
        const isLast = index === TIMELINE_STEPS.length - 1;
        const Icon = step.icon;

        return (
          <div
            key={step.key}
            className={cn('flex items-center', !isLast && 'flex-1')}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500',
                  isCompleted
                    ? 'border-gold-500 bg-gold-500 text-ink-950'
                    : 'border-ink-200 bg-surface text-ink-300',
                )}
              >
                <Icon className="h-4 w-4" />
                {/* Soft glow ring on the currently-active step only */}
                {index === activeIndex && (
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-gold-500/30"
                  />
                )}
              </div>
              <span
                className={cn(
                  'max-w-[70px] text-center text-[11px] font-medium leading-tight',
                  isCompleted ? 'text-ink-900' : 'text-ink-400',
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="relative mx-2 mt-[-20px] h-[2px] flex-1 bg-ink-200">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 bg-gold-500 transition-all duration-700 ease-out',
                    index < activeIndex ? 'w-full' : 'w-0',
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
