'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AddressDto, DeliveryMethodDto } from '@/types/api';
import type { CheckoutStep } from '@/components/checkout/checkout-progress';

interface CheckoutContextValue {
  step: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
  address: AddressDto | null;
  setAddress: (address: AddressDto) => void;
  deliveryMethod: DeliveryMethodDto | null;
  setDeliveryMethod: (method: DeliveryMethodDto) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<CheckoutStep>('Address');
  const [address, setAddress] = useState<AddressDto | null>(null);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethodDto | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        step,
        setStep,
        address,
        setAddress,
        deliveryMethod,
        setDeliveryMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
