import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { formatPrice } from '@/lib/utils/format';
import { getOrders } from '@/lib/api/orders';

export default async function OrdersPage() {
  const orders = await getOrders().catch(() => []);

  return (
    <Container className="py-16">
      <div className="border-b border-ink-100 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          History
        </p>

        <h1 className="mt-3 font-serif text-4xl text-ink-900">Your Orders</h1>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="When you place an order, it will show up here."
          actionLabel="Start Shopping"
          actionHref="/products"
        />
      ) : (
        <div className="mt-10 divide-y divide-ink-100">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-ink-50/50"
            >
              <div>
                <p className="text-sm font-medium text-ink-900">
                  Order #{order.id}
                </p>

                <p className="mt-1 text-xs text-ink-500">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {order.orderItems.length}{' '}
                  {order.orderItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <OrderStatusBadge status={order.status} />

                <p className="hidden font-serif text-base text-ink-900 sm:block">
                  {formatPrice(order.total)}
                </p>

                <ChevronRight className="h-4 w-4 text-ink-300 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
