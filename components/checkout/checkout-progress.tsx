'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const STEPS = ['Address', 'Delivery', 'Payment'] as const;
export type CheckoutStep = (typeof STEPS)[number];

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <ol className="flex items-center">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === STEPS.length - 1;

        return (
          <li
            key={step}
            className={cn('flex items-center', !isLast && 'flex-1')}
          >
            <div className="flex flex-col items-center gap-2">
              {/* Step circle */}
              <div
                className={cn(
                  'relative flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500',
                  isCompleted && 'border-gold-500 bg-gold-500 text-ink-950',
                  isActive &&
                    'border-ink-900 bg-ink-900 text-white ring-4 ring-ink-900/10',
                  !isCompleted && !isActive && 'border-ink-300 text-ink-400',
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-wide sm:text-xs',
                  isActive || isCompleted ? 'text-ink-900' : 'text-ink-400',
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector line — fills left-to-right as steps complete */}
            {!isLast && (
              <div className="relative mx-3 h-[2px] flex-1 bg-ink-200 sm:mx-6">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 bg-gold-500 transition-all duration-700 ease-out',
                    isCompleted ? 'w-full' : 'w-0',
                  )}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
