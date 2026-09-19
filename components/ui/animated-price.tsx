'use client';

import { useCountUp } from '@/hooks/use-count-up';
import { formatPrice } from '@/lib/utils/format';

export function AnimatedPrice({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const animatedValue = useCountUp(value);
  return <span className={className}>{formatPrice(animatedValue)}</span>;
}
