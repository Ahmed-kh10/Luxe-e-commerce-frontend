import Link from 'next/link';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-4 py-16 sm:px-6 lg:px-16">
        <div className="w-full max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl text-ink-900">{title}</h1>
          <p className="mt-2 text-sm text-ink-500">{subtitle}</p>

          <div className="mt-10">{children}</div>
        </div>
      </div>

      {/* Right: decorative panel — hidden on smaller screens */}
      <div className="relative hidden overflow-hidden bg-obsidian-950 lg:block">
        {' '}
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black" />{' '}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(201,162,39,0.15),transparent_60%)]" />
        {/* Decorative corner frame — a quiet luxury signature */}
        <div className="absolute inset-12 border border-white/10" />
        <div className="absolute left-12 top-12 h-8 w-8 border-l border-t border-gold-500/60" />
        <div className="absolute bottom-12 right-12 h-8 w-8 border-b border-r border-gold-500/60" />
        <div className="relative flex h-full flex-col items-center justify-center px-12 text-center">
          <Link href="/" className="font-serif text-3xl text-white">
            LUXE<span className="text-gold-500">.</span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-400">
            Considered design, exceptional craftsmanship. Sign in to pick up
            right where you left off.
          </p>
        </div>
      </div>
    </div>
  );
}
