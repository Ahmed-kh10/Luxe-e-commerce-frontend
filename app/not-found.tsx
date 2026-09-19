import Link from 'next/link';
import { Compass } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function GlobalNotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      {/* Oversized, deliberately faint "404" as a typographic backdrop */}{' '}
      <div className="relative flex h-32 items-center justify-center sm:h-44">
        {' '}
        <span
          aria-hidden
          className="pointer-events-none absolute select-none font-serif text-[8rem] leading-none text-ink-100 sm:text-[12rem]"
        >
          404{' '}
        </span>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-obsidian-900 text-gold-400">
          <Compass className="h-7 w-7" />
        </div>
      </div>
      <h1 className="mt-6 font-serif text-2xl text-ink-900 sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button size="lg" variant="primary">
            Back to Home
          </Button>
        </Link>

        <Link href="/products">
          <Button size="lg" variant="outline">
            Explore Collection
          </Button>
        </Link>
      </div>
    </Container>
  );
}
