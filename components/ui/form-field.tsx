'use client';

import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, type = 'text', className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-600"
        >
          {label}
        </label>

        <div className="group relative">
          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? 'text' : type}
            aria-invalid={Boolean(error)}
            className={cn(
              'h-12 w-full border bg-transparent px-4 text-sm text-ink-900 outline-none transition-colors',
              'placeholder:text-ink-400',
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-ink-300 focus:border-ink-900',
              isPassword && 'pr-11',
              className,
            )}
            {...props}
          />

          {/* Animated focus underline — a second, gold accent under the border */}
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute bottom-0 left-0 h-[2px] w-full scale-x-0 bg-gold-500 transition-transform duration-300 ease-out',
              'group-focus-within:scale-x-100',
              error && 'bg-red-500',
            )}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-900"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
