'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, MapPin, Package, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { href: '/account', label: 'Profile', icon: User },
  { href: '/account/address', label: 'Address', icon: MapPin },
  { href: '/orders', label: 'Order History', icon: Package },
];

export function AccountNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'group relative flex items-center gap-3 px-4 py-3 text-sm transition-colors',
              'before:absolute before:left-0 before:top-1/2 before:h-0 before:w-[2px] before:-translate-y-1/2 before:bg-gold-500 before:transition-all before:duration-300',
              isActive
                ? 'font-medium text-ink-900 before:h-full'
                : 'text-ink-500 hover:text-ink-900 hover:before:h-2/3',
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={logout}
        className="group relative mt-4 flex items-center gap-3 px-4 py-3 text-sm text-ink-500 transition-colors before:absolute before:left-0 before:top-1/2 before:h-0 before:w-[2px] before:-translate-y-1/2 before:bg-red-500 before:transition-all before:duration-300 hover:text-red-600 hover:before:h-2/3"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </nav>
  );
}
