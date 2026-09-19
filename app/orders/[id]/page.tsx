import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { OrderTimeline } from '@/components/orders/order-timeline';
import { formatPrice } from '@/lib/utils/format';
import { getOrderById } from '@/lib/api/orders';
import { SmartImage } from '@/components/ui/smart-image';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;
  const orderId = Number(id);

  if (Number.isNaN(orderId)) {
    notFound();
  }

  let order;
  try {
    order = await getOrderById(orderId);
  } catch {
    notFound();
  }

  return (
    <Container className="py-16">
      <Breadcrumbs
        items={[
          { label: 'Orders', href: '/orders' },
          { label: `#${order.id}` },
        ]}
      />

      <Link
        href="/orders"
        className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Orders
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 pb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Order Details
          </p>
          <h1 className="mt-3 font-serif text-3xl text-ink-900 sm:text-4xl">
            Order #{order.id}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Placed on{' '}
            {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Timeline — overflow-x-auto keeps this usable on narrow phones */}
      <div className="mt-10 overflow-x-auto pb-2">
        <div className="min-w-[400px]">
          <OrderTimeline status={order.status} />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div>
          <h2 className="heading-accent pb-4 font-serif text-xl text-ink-900">
            Items
          </h2>
          <div className="mt-6 divide-y divide-ink-100">
            {order.orderItems.map((item) => (
              <div key={item.productId} className="flex gap-4 py-5">
                {}
                <div className="relative h-20 w-16 shrink-0 bg-ink-100">
                  <SmartImage
                    src={item.pictureUrl}
                    alt={item.productName}
                    fill
                    sizes="64px"
                    className="object-cover"
                    fallbackClassName="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink-900">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-serif text-sm text-ink-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="space-y-8">
          <div className="border border-ink-200 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-900">
              Shipping Address
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {order.shipToAddress.firstName} {order.shipToAddress.lastName}
              <br />
              {order.shipToAddress.street}
              <br />
              {order.shipToAddress.city}, {order.shipToAddress.state}{' '}
              {order.shipToAddress.zipCode}
            </p>
          </div>

          <div className="border border-ink-200 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-900">
              Delivery Method
            </h3>
            <p className="mt-3 text-sm text-ink-600">{order.deliveryMethod}</p>
          </div>

          <div className="border border-ink-200 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-900">
              Payment Summary
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingPrice)}</span>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-2 font-serif text-base text-ink-900">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
