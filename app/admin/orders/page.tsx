'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { OrderStatusSelect } from '@/components/admin/order-status-select';
import { getAllOrdersAdmin } from '@/lib/api/admin-orders';
import { formatPrice } from '@/lib/utils/format';
import { useToast } from '@/lib/toast/toast-context';
import type { OrderReturnDto } from '@/types/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderReturnDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    getAllOrdersAdmin()
      .then(setOrders)
      .catch(() => showToast('Failed to load orders', 'error'))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStatusUpdate(orderId: string, newStatus: string) {
    setOrders((current) =>
      current.map((order) =>
        order.id.toString() === orderId
          ? { ...order, status: newStatus }
          : order,
      ),
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        Fulfillment
      </p>
      <h1 className="mt-2 font-serif text-3xl text-ink-900">Orders</h1>

      <div className="mt-6 overflow-hidden border border-ink-200 bg-surface">
        {isLoading ? (
          <div className="space-y-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState title="No orders yet" />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50">
              <tr>
                <th className="px-4 py-3 font-medium text-ink-500">Order</th>
                <th className="px-4 py-3 font-medium text-ink-500">Customer</th>
                <th className="px-4 py-3 font-medium text-ink-500">Date</th>
                <th className="px-4 py-3 font-medium text-ink-500">Total</th>
                <th className="px-4 py-3 font-medium text-ink-500">Status</th>
                <th className="px-4 py-3 text-right font-medium text-ink-500">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3 font-medium text-ink-900">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 text-ink-500">{order.buyerEmail}</td>
                  <td className="px-4 py-3 text-ink-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-serif text-ink-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect
                      orderId={order.id.toString()}
                      currentStatus={order.status}
                      onUpdated={(newStatus) =>
                        handleStatusUpdate(order.id.toString(), newStatus)
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-gold-600"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
