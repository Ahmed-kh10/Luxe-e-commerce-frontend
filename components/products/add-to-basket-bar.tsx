'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { QuantitySelector } from './quantity-selector';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/lib/basket/basket-context';
import { useToast } from '@/lib/toast/toast-context';
import type { ProductDto } from '@/types/api';

interface AddToBasketBarProps {
  product: ProductDto;
}

export function AddToBasketBar({ product }: AddToBasketBarProps) {
  const { addItem } = useBasket();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  function handleAddToBasket() {
    addItem(product, quantity);
    showToast(`${product.name} added to your basket`, 'success');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <QuantitySelector quantity={quantity} onChange={setQuantity} />

      <Button
        size="lg"
        variant="primary"
        onClick={handleAddToBasket}
        disabled={isAdded}
        className="flex-1"
      >
        {isAdded ? (
          <>
            <Check className="h-4 w-4" />
            Added to Basket
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            Add to Basket
          </>
        )}
      </Button>
    </div>
  );
}
