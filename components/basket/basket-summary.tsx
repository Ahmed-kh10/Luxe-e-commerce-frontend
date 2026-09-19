import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils/format';
import type { BasketTotals } from '@/lib/basket/totals';
import { AnimatedPrice } from '@/components/ui/animated-price';

interface BasketSummaryProps {
  totals: BasketTotals;
}

export function BasketSummary({ totals }: BasketSummaryProps) {
  return (
    <div className="border border-ink-200 p-6 sm:p-8">
      <h2 className="heading-accent pb-4 font-serif text-xl text-ink-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between text-ink-600">
          <span>
            Subtotal ({totals.itemCount}{' '}
            {totals.itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="text-ink-900">{formatPrice(totals.subtotal)}</span>
        </div>

        <div className="flex justify-between text-ink-600">
          <span>Shipping</span>
          <span className="text-ink-900">
            {totals.shipping === 0
              ? 'Calculated at checkout'
              : formatPrice(totals.shipping)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-between border-t border-ink-200 pt-6">
        <span className="font-serif text-lg text-ink-900">Total</span>
        <AnimatedPrice
          value={totals.total}
          className="font-serif text-lg text-ink-900"
        />
      </div>

      <Link href="/checkout" className="mt-8 block">
        <Button size="lg" variant="primary" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>

      <Link
        href="/products"
        className="mt-4 block text-center text-xs text-ink-500 hover:text-ink-900"
      >
        Continue Shopping
      </Link>

      <p className="mt-6 text-center text-[11px] text-ink-400">
        Final totals, including shipping, are confirmed at checkout.
      </p>
    </div>
  );
}
