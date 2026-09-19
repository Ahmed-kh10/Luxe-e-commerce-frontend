'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { CheckoutProvider, useCheckout } from '@/lib/checkout/checkout-context';
import { CheckoutProgress } from '@/components/checkout/checkout-progress';
import { CheckoutAddressStep } from '@/components/checkout/checkout-address-step';
import { CheckoutDeliveryStep } from '@/components/checkout/checkout-delivery-step';
import { PaymentForm } from '@/components/checkout/payment-form';
import { StripeProvider } from '@/lib/payment/stripe-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { createOrUpdatePaymentIntent } from '@/lib/api/payment';
import { createOrder } from '@/lib/api/orders';
import { saveBasket } from '@/lib/api/basket';
import { useBasket } from '@/lib/basket/basket-context';

function PaymentStep() {
  const router = useRouter();
  const { address, deliveryMethod } = useCheckout();
  const { basket, clearBasket } = useBasket();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(true);
  const [prepError, setPrepError] = useState(false);

  // Ask the backend to create/refresh the PaymentIntent for this basket —
  // the backend computes the real, authoritative amount (never trust a
  // client-calculated total for anything charge-related).
  useEffect(() => {
    if (!basket || !deliveryMethod || !basket.id) return;

    const currentBasket = basket;
    const currentDeliveryMethod = deliveryMethod;
    const basketId = basket.id;
    const deliveryMethodId = deliveryMethod.id;

    let isCancelled = false;

    async function prepare() {
      setIsPreparing(true);
      setPrepError(false);

      try {
        // 1. Save delivery method to basket
        const updatedBasket = {
          ...currentBasket,
          deliveryMethodId,
        };

        await saveBasket(updatedBasket);

        // 2. Create/update PaymentIntent
        const result = await createOrUpdatePaymentIntent(basketId);

        const secret = (result as unknown as { clientSecret?: string })
          .clientSecret;

        if (isCancelled) return;

        if (secret) {
          setClientSecret(secret);
        } else {
          setPrepError(true);
        }
      } catch {
        if (!isCancelled) {
          setPrepError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsPreparing(false);
        }
      }
    }

    prepare();

    return () => {
      isCancelled = true;
    };
  }, [basket?.id, deliveryMethod?.id]);

  async function handlePaymentSuccess() {
    if (!basket || !address || !deliveryMethod) return;

    try {
      const order = await createOrder({
        basketId: basket.id,
        deliveryMethodId: deliveryMethod.id,
        shipToAddress: address,
      });
      clearBasket();
      router.push(`/checkout/confirmation?orderId=${order.id}`);
    } catch {
      router.push('/checkout/confirmation');
    }
  }

  if (isPreparing) {
    return (
      <div className="max-w-lg space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (prepError || !clientSecret) {
    return (
      <ErrorState
        title="Couldn't prepare payment"
        description="Please go back and confirm your delivery details, then try again."
      />
    );
  }

  return (
    <StripeProvider clientSecret={clientSecret}>
      <PaymentForm onSuccess={handlePaymentSuccess} />
    </StripeProvider>
  );
}

function CheckoutContent() {
  const { step } = useCheckout();

  return (
    <Container className="py-16">
      <div className="border-b border-ink-100 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Secure Checkout
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-900">Checkout</h1>
      </div>

      <div className="mt-10 max-w-2xl">
        <CheckoutProgress currentStep={step} />
      </div>

      <div className="mt-12">
        {step === 'Address' && <CheckoutAddressStep />}
        {step === 'Delivery' && <CheckoutDeliveryStep />}
        {step === 'Payment' && <PaymentStep />}
      </div>
    </Container>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}
