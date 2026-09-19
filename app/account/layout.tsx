import { Container } from '@/components/ui/container';
import { AccountNav } from '@/components/account/account-nav';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-16">
      <div className="border-b border-ink-100 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Your Space
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-900">My Account</h1>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
        <AccountNav />
        <div>{children}</div>
      </div>
    </Container>
  );
}
