'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useMemo, type ReactNode } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
}

export function StripeProvider({
  clientSecret,
  children,
}: StripeProviderProps) {
  const options = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: 'stripe' as const,
        variables: {
          colorPrimary: '#c9a227', // gold-500 — matches the design system
          colorBackground: '#ffffff',
          colorText: '#121212', // ink-900
          colorDanger: '#dc2626',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '0px', // sharp edges, matching the rest of the UI
          spacingUnit: '4px',
        },
        rules: {
          '.Input': {
            border: '1px solid #c4c4c4', // ink-300
            padding: '12px',
          },
          '.Input:focus': {
            border: '1px solid #121212', // ink-900
            boxShadow: 'none',
          },
          '.Label': {
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#4a4a4a', // ink-600
          },
        },
      },
    }),
    [clientSecret],
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
