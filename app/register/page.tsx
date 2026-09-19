'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { AuthLayout } from '@/components/auth/auth-layout';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/lib/validation/auth-schemas';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);
    try {
      await registerUser({
        username: values.username,
        displayName: values.displayName,
        email: values.email,
        password: values.password,
      });
      router.push('/account');
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We couldn't create your account. Please try again.",
      );
    }
  }

  return (
    <AuthLayout
      eyebrow="Join Luxe"
      title="Create Account"
      subtitle={
        <>
          Already a member?{' '}
          <Link href="/login" className="link-underline text-ink-900">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {serverError && (
          <div className="flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <FormField
          label="Username"
          autoComplete="username"
          placeholder="jane_doe"
          error={errors.username?.message}
          {...register('username')}
        />

        <FormField
          label="Full Name"
          autoComplete="name"
          placeholder="Jane Doe"
          error={errors.displayName?.message}
          {...register('displayName')}
        />

        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <FormField
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <FormField
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full"
        >
          Create Account
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-ink-400">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-ink-600">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-ink-600">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthLayout>
  );
}
