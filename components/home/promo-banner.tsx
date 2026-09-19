import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-ink-100 py-24">
      {/* Decorative oversized serif watermark — purely typographic, no image needed */}{' '}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-serif text-[10rem] leading-none text-ink-200/60 sm:text-[16rem]"
      >
        LUXE{' '}
      </span>
      <RevealOnScroll>
        <Container className="relative flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
            Members Only
          </p>

          <h2 className="mt-4 max-w-lg font-serif text-3xl text-ink-900 sm:text-4xl">
            Early access to new arrivals, always.
          </h2>

          <p className="mt-4 max-w-md text-ink-600">
            Create an account to unlock member pricing, faster checkout, and a
            history of everything you&apos;ve loved.
          </p>

          <Link href="/register" className="mt-8">
            <Button size="lg" variant="primary">
              Create an Account
            </Button>
          </Link>
        </Container>
      </RevealOnScroll>
    </section>
  );
}
