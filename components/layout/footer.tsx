import Link from 'next/link';
import { Container } from '@/components/ui/container';

const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { href: '/products', label: 'All Products' },
      { href: '/products?sort=new', label: 'New Arrivals' },
      { href: '/products?sort=priceDesc', label: 'Best Sellers' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { href: '/shipping', label: 'Shipping' },
      { href: '/returns', label: 'Returns' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Account',
    links: [
      { href: '/account', label: 'My Account' },
      { href: '/orders', label: 'Order History' },
      { href: '/login', label: 'Sign In' },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram', icon: '◎' },
  { href: '#', label: 'Facebook', icon: 'f' },
  { href: '#', label: 'Twitter', icon: '𝕏' },
];

export function Footer() {
  return (
    <footer className="relative bg-obsidian-950 text-obsidian-300">
      {' '}
      {/* Thin gold accent line at the very top of the footer */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl text-white">
              LUXE<span className="text-gold-500">.</span>
            </span>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Considered design, exceptional craftsmanship. An experience worth
              returning to.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-sm font-medium text-ink-300 transition-colors hover:border-gold-500 hover:text-gold-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Luxe. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-ink-500">
            <Link href="/privacy" className="hover:text-ink-300">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-ink-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
