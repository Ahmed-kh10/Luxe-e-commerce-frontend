'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[GlobalError]', error);
    }
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-red-100" />
        <AlertTriangle className="relative h-7 w-7 text-red-500" />
      </div>

      <h1 className="mt-6 font-serif text-2xl text-ink-900 sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500">
        We hit an unexpected snag on our end. Please try again — if the problem
        continues, come back a little later.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button size="lg" variant="primary" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button size="lg" variant="outline">
            Back to Home
          </Button>
        </Link>
      </div>
    </Container>
  );
}
