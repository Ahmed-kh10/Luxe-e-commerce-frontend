import { Container } from '@/components/ui/container';
import type { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="heading-accent pb-4 font-serif text-3xl text-ink-900 sm:text-4xl">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-4 text-xs uppercase tracking-wide text-ink-400">
            Last updated: {lastUpdated}
          </p>
        )}
        <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-ink-600">
          {children}
        </div>
      </div>
    </Container>
  );
}
