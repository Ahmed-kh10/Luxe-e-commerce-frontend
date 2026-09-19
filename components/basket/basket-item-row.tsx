'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';
import { QuantitySelector } from '@/components/products/quantity-selector';
import { SmartImage } from '@/components/ui/smart-image';
import { formatPrice } from '@/lib/utils/format';
import { useBasket } from '@/lib/basket/basket-context';
import type { BasketItemDto } from '@/types/api';

function BasketItemRowComponent({ item }: { item: BasketItemDto }) {
  const { updateQuantity, removeItem } = useBasket();

  return (
    <div className="flex gap-4 border-b border-ink-100 py-6 first:pt-0">
      <Link
        href={`/products/${item.id}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink-100 sm:h-32 sm:w-28"
      >
        <SmartImage
          src={item.pictureUrl}
          alt={item.productName}
          fill
          sizes="120px"
          className="object-cover"
          fallbackClassName="absolute inset-0 h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${item.id}`}
              className="text-sm font-medium text-ink-900 hover:text-gold-600"
            >
              {item.productName}
            </Link>
            <p className="mt-1 text-xs uppercase tracking-wide text-ink-400">
              {item.brand} · {item.type}
            </p>
          </div>

          <p className="whitespace-nowrap font-serif text-base text-ink-900">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => updateQuantity(item.id, qty)}
            max={20}
          />

          <button
            type="button"
            aria-label={`Remove ${item.productName} from basket`}
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export const BasketItemRow = memo(BasketItemRowComponent);
