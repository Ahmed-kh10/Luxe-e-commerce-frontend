'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <Container className="flex flex-col items-center py-24 text-center">
      {/* Success icon with a radiating gold ring — the "reward" moment */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/20" />
        <span className="absolute inset-0 rounded-full bg-gold-500/10" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-gold-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
        Order Confirmed
      </p>

      <h1 className="mt-3 max-w-md font-serif text-3xl text-ink-900 sm:text-4xl">
        Thank you for your order
      </h1>

      {orderId && (
        <p className="mt-4 text-sm text-ink-500">
          Order Reference:{' '}
          <span className="font-medium text-ink-900">#{orderId}</span>
        </p>
      )}

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
        We&apos;re preparing your items with care. You&apos;ll receive a
        confirmation email shortly, and you can track everything from your order
        history.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/orders">
          <Button size="lg" variant="primary">
            <Package className="h-4 w-4" />
            View Order
          </Button>
        </Link>

        <Link href="/products">
          <Button size="lg" variant="outline">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </Container>
  );
}
