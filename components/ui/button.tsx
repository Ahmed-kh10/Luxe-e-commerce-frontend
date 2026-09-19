import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-ink-900 text-white hover:bg-ink-800 before:bg-gold-500/0 hover:before:bg-gold-500/10',
  secondary: 'bg-gold-500 text-ink-950 hover:bg-gold-400',
  outline:
    'border border-ink-300 text-ink-900 hover:border-ink-900 bg-transparent',
  ghost: 'bg-transparent text-ink-900 hover:bg-ink-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'font-medium tracking-wide transition-colors duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'before:absolute before:inset-0 before:transition-colors before:duration-300',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';
