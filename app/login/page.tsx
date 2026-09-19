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
  loginSchema,
  type LoginFormValues,
} from '@/lib/validation/auth-schemas';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    try {
      await login(values);
      router.push('/account');
    } catch {
      // Deliberately generic — never confirm/deny which field was wrong,
      // to avoid account enumeration.
      setServerError('Invalid email or password. Please try again.');
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome Back"
      title="Sign In"
      subtitle={
        <>
          New here?{' '}
          <Link href="/register" className="link-underline text-ink-900">
            Create an account
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
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full"
        >
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}
