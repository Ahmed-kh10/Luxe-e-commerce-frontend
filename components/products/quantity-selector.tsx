'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  function decrement() {
    if (quantity > min) onChange(quantity - 1);
  }

  function increment() {
    if (quantity < max) onChange(quantity + 1);
  }

  return (
    <div
      role="group"
      aria-label="Quantity"
      className="inline-flex h-12 items-center border border-ink-300"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={decrement}
        disabled={quantity <= min}
        className="flex h-full w-11 items-center justify-center text-ink-600 transition-colors hover:bg-ink-100 disabled:pointer-events-none disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span
        className="flex h-full w-12 items-center justify-center text-sm font-medium text-ink-900 tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={increment}
        disabled={quantity >= max}
        className="flex h-full w-11 items-center justify-center text-ink-600 transition-colors hover:bg-ink-100 disabled:pointer-events-none disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
