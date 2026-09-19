import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="font-serif text-2xl tracking-tight text-ink-900"
      aria-label="Luxury Store — Home"
    >
      LUXE<span className="text-gold-500">.</span>
    </Link>
  );
}
