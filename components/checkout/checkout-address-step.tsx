'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { useCheckout } from '@/lib/checkout/checkout-context';
import {
  addressSchema,
  type AddressFormValues,
} from '@/lib/validation/address-schema';

export function CheckoutAddressStep() {
  const { setAddress, setStep } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  function onSubmit(values: AddressFormValues) {
    setAddress(values);
    setStep('Delivery');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {' '}
        <FormField
          label="First Name"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <FormField
          label="Last Name"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <FormField
        label="Street Address"
        error={errors.street?.message}
        {...register('street')}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="City"
          error={errors.city?.message}
          {...register('city')}
        />
        <FormField
          label="State"
          error={errors.state?.message}
          {...register('state')}
        />
      </div>

      <FormField
        label="ZIP Code"
        error={errors.zipCode?.message}
        {...register('zipCode')}
      />

      <Button type="submit" size="lg" variant="primary" className="w-full">
        Continue to Delivery
      </Button>
    </form>
  );
}
