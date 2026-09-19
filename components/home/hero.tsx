import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { MagneticWrapper } from '@/components/ui/magnetic-wrapper';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-obsidian-950">
      {' '}
      {/* Layered gradient backdrop — a real image can replace this later
by dropping a file into /public and restoring an <Image> tag */}{' '}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,162,39,0.12),transparent_60%)]" />
      {/* Faint corner ornament — purely decorative */}
      <div
        aria-hidden
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-[0.15]"
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.5) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
          The New Season
        </p>

        <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.1] text-white sm:text-6xl lg:text-7xl">
          Where Craft
          <br />
          Meets Character
          <span className="text-gold-500">.</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-300 sm:text-lg">
          A curated collection built on precision, restraint, and enduring
          quality — for those who notice the difference.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <MagneticWrapper strength={15}>
            <Link href="/products">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore Collection
              </Button>
            </Link>
          </MagneticWrapper>

          <Link href="/products?sort=new">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-ink-500 text-white hover:border-white sm:w-auto"
            >
              New Arrivals
            </Button>
          </Link>
        </div>
      </div>
      {/* Scroll indicator — subtle, animated, respects reduced motion via globals.css */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[10px] uppercase tracking-widest text-ink-400">
          Scroll
        </span>

        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold-500 to-transparent" />
      </div>
    </section>
  );
}
