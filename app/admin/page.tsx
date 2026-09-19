import { Package, ShoppingBag, DollarSign } from 'lucide-react';
import { getProducts } from '@/lib/api/products';

async function getOverviewStats() {
  try {
    const products = await getProducts({ pageSize: 1, pageIndex: 1 });
    return { productCount: products.count };
  } catch {
    return { productCount: 0 };
  }
}

export default async function AdminOverviewPage() {
  const { productCount } = await getOverviewStats();

  const stats = [
    { label: 'Total Products', value: productCount, icon: Package },
    { label: 'Orders', value: '—', icon: ShoppingBag },
    { label: 'Revenue', value: '—', icon: DollarSign },
  ];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        Dashboard
      </p>
      <h1 className="mt-2 font-serif text-3xl text-ink-900">Overview</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="border border-ink-200 bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-ink-400">
                  {stat.label}
                </p>
                <Icon className="h-4 w-4 text-gold-500" />
              </div>
              <p className="mt-3 font-serif text-2xl text-ink-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
