'use client';

import { useState, type FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { AlertCircle, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentFormProps {
  onSuccess: () => void;
}

export function PaymentForm({ onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmation`,
      },
      redirect: 'if_required',
    });

    if (error) {
      // Stripe's own error messages are already safe and user-facing —
      // never expose raw backend/Stripe internals beyond this.
      setErrorMessage(error.message ?? 'Payment failed. Please try again.');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess();
    } else {
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      {errorMessage && (
        <div className="flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Payment Element container — a subtle gold corner frame around
          Stripe's embedded UI, tying it visually to the rest of the site */}
      <div className="relative border border-ink-200 p-5">
        <span
          aria-hidden
          className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold-500"
        />
        <span
          aria-hidden
          className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold-500"
        />
        <PaymentElement />
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isProcessing}
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        <Lock className="h-4 w-4" />
        {isProcessing ? 'Processing...' : 'Pay Securely'}
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        Payments are processed securely by Stripe. We never see your card
        details.
      </p>
    </form>
  );
}
