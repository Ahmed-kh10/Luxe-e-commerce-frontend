import { AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this right now. Please try again in a moment.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="mt-6 font-serif text-xl text-ink-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-500">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-6">
          Try Again
        </Button>
      )}
    </div>
  );
}
