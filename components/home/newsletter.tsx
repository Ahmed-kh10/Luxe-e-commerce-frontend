'use client';

import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Real newsletter endpoint isn't part of the backend contract yet.
    if (email.trim()) {
      setStatus('success');
    }
  }

  return (
    <section className="border-t border-ink-100 py-20">
      {' '}
      <RevealOnScroll>
        {' '}
        <Container className="flex flex-col items-center text-center">
          {' '}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-gold-400">
            {' '}
            <Mail className="h-6 w-6" />{' '}
          </div>
          <h2 className="mt-6 font-serif text-2xl text-ink-900 sm:text-3xl">
            Join the inner circle
          </h2>
          <p className="mt-3 max-w-sm text-sm text-ink-600">
            One thoughtful email a month. No noise, ever.
          </p>
          {status === 'success' ? (
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-ink-900">
              <CheckCircle2 className="h-5 w-5 text-gold-600" />
              You&apos;re on the list. Welcome.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 flex-1 border border-ink-300 bg-transparent px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
              />

              <Button type="submit" size="md" className="sm:w-auto">
                Subscribe
              </Button>
            </form>
          )}
        </Container>
      </RevealOnScroll>
    </section>
  );
}
