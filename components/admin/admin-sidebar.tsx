"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-ink-100 bg-surface">
      <div className="flex h-20 items-center border-b border-ink-100 px-6">
        <span className="font-serif text-xl text-ink-900">
          LUXE<span className="text-gold-500">.</span>
          <span className="ml-1 font-sans text-xs font-normal uppercase tracking-widest text-ink-400">
            Admin
          </span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors",
                "before:absolute before:left-0 before:top-1/2 before:h-0 before:w-[2px] before:-translate-y-1/2 before:bg-gold-500 before:transition-all before:duration-300",
                isActive
                  ? "bg-ink-50 font-medium text-ink-900 before:h-2/3"
                  : "text-ink-500 hover:bg-ink-50 hover:text-ink-900 hover:before:h-1/3"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink-100 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-3 text-xs text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Store
        </Link>
      </div>
    </aside>
  );
}