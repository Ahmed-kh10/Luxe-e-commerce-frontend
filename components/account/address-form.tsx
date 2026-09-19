'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { getCurrentUser, saveAddress, updateAddress } from '@/lib/api/auth';
import {
  addressSchema,
  type AddressFormValues,
} from '@/lib/validation/address-schema';
import type { AddressDto } from '@/types/api';

interface AddressFormProps {
  initialAddress: AddressDto | null;
}

export function AddressForm({ initialAddress }: AddressFormProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialAddress ?? undefined,
  });

  async function onSubmit(values: AddressFormValues) {
    setServerError(null);
    try {
      if (initialAddress) {
        await updateAddress(values);
      } else {
        await saveAddress(values);
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      setServerError("Couldn't save your address. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-5">
      {serverError && (
        <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {' '}
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

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Save Address
        </Button>

        {/* Success confirmation — fades in, holds, fades out on its own */}
        <span
          className={cn(
            'flex items-center gap-1.5 text-sm text-ink-600 transition-opacity duration-300',
            isSaved ? 'opacity-100' : 'opacity-0',
          )}
        >
          <CheckCircle2 className="h-4 w-4 text-gold-600" />
          Saved
        </span>
      </div>
    </form>
  );
}
