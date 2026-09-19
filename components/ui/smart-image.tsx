'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type SmartImageProps = Omit<ImageProps, 'onError'> & {
  fallbackClassName?: string;
};

/**
 * Tries next/image first for its real performance benefits (automatic
 * srcset, lazy loading, format optimization). If the configured
 * remotePatterns ever reject a host (a common friction point with
 * dynamic backend-hosted images), it falls back to a plain <img> instead
 * of crashing the page — the user never sees a broken image.
 */
export function SmartImage({
  fallbackClassName,
  className,
  alt,
  ...props
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError && typeof props.src === 'string') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={props.src}
        alt={alt}
        className={fallbackClassName ?? className}
        loading="lazy"
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
