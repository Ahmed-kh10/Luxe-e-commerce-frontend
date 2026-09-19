'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Menu, X, Search, User, ShoppingBag, Heart } from 'lucide-react';

import { LayoutDashboard } from 'lucide-react';

import { Logo } from './logo';
import { cn } from '@/lib/utils/cn';
import { useBasket } from '@/lib/basket/basket-context';
import { useAuth } from '@/lib/auth/auth-context';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useWishlist } from '@/lib/wishlist/wishlist-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const SearchOverlay = dynamic(
  () =>
    import('@/components/search/search-overlay').then((m) => m.SearchOverlay),
  {
    ssr: false,
  },
);

const NAV_LINKS = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const { ids: wishlistIds } = useWishlist();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totals } = useBasket();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileTrapRef = useFocusTrap<HTMLDivElement>(isMobileOpen);

  // Add subtle border/shadow after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Ctrl/Cmd + K opens search
  useEffect(() => {
    const handleGlobalShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalShortcut);

    return () => {
      window.removeEventListener('keydown', handleGlobalShortcut);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md transition-shadow duration-300',
          isScrolled
            ? 'border-b border-ink-200 shadow-soft'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-10 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-sm font-medium tracking-wide text-ink-700 hover:text-ink-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <ThemeToggle />
            <button
              type="button"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 sm:flex"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Account */}
            {isAuthenticated ? (
              <div className="group relative hidden sm:block">
                <button
                  type="button"
                  className="flex h-11 items-center gap-2 rounded-full px-3 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <User className="h-5 w-5" />

                  <span className="max-w-[100px] truncate">
                    {user?.displayName}
                  </span>
                </button>

                {/* Account dropdown */}
                <div className="invisible absolute right-0 top-full w-48 border border-ink-200 bg-surface opacity-0 shadow-elevated transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 border-b border-ink-100 px-4 py-3 text-sm font-medium text-gold-600 hover:bg-ink-100"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/account"
                    className="block px-4 py-3 text-sm text-ink-700 hover:bg-ink-100 hover:text-ink-900"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-3 text-sm text-ink-700 hover:bg-ink-100 hover:text-ink-900"
                  >
                    Order History
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="block w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                aria-label="Sign in"
                className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 sm:flex"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistIds.length} items`}
              className="relative hidden h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 sm:flex"
            >
              <Heart className="h-5 w-5" />

              {wishlistIds.length > 0 && (
                <span
                  key={wishlistIds.length}
                  className="absolute right-1 top-1 flex h-4 w-4 animate-[badge-pop_0.3s_ease-out] items-center justify-center rounded-full bg-gold-500 text-[10px] font-semibold text-ink-950"
                >
                  {wishlistIds.length > 9 ? '9+' : wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Basket */}
            <Link
              href="/basket"
              aria-label={`Basket, ${totals.itemCount} items`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <ShoppingBag className="h-5 w-5" />

              {totals.itemCount > 0 && (
                <span
                  key={totals.itemCount}
                  className="absolute right-1 top-1 flex h-4 w-4 animate-[badge-pop_0.3s_ease-out] items-center justify-center rounded-full bg-gold-500 text-[10px] font-semibold text-ink-950"
                >
                  {totals.itemCount > 9 ? '9+' : totals.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={closeMobileMenu}
          className={cn(
            'absolute inset-0 bg-ink-950/40 transition-opacity duration-300',
            isMobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          ref={mobileTrapRef}
          className={cn(
            'absolute right-0 top-0 h-full w-full max-w-sm bg-surface shadow-elevated transition-transform duration-300 ease-out',
            isMobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Drawer header */}
          <div className="flex h-20 items-center justify-between px-6">
            <Logo />

            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav
            className="flex flex-col gap-1 px-6 py-4"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="border-b border-ink-100 py-4 text-lg font-medium text-ink-900"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/wishlist"
              onClick={closeMobileMenu}
              className="flex items-center justify-between border-b border-ink-100 py-4 text-lg font-medium text-ink-900"
            >
              <span>Wishlist</span>

              {wishlistIds.length > 0 && (
                <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs font-semibold text-ink-950">
                  {wishlistIds.length > 9 ? '9+' : wishlistIds.length}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              onClick={closeMobileMenu}
              className="py-4 text-lg font-medium text-ink-900"
            >
              Account
            </Link>
          </nav>
        </div>
      </div>

      {/* Search overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
