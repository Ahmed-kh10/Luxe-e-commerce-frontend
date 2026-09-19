'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils/cn';
import { SmartImage } from '@/components/ui/smart-image';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center bg-ink-100 text-sm text-ink-400">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse lg:flex-col">
      {/* Main image */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-ink-100">
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-16 opacity-60"
          style={{
            background:
              'linear-gradient(135deg, rgba(201,162,39,0.25) 0%, transparent 60%)',
          }}
        />

        <SmartImage
          key={activeImage}
          src={activeImage}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          fallbackClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto sm:flex-col lg:flex-row">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
              className={cn(
                'relative h-20 w-16 shrink-0 overflow-hidden bg-ink-100 transition-all duration-300',
                index === activeIndex
                  ? 'ring-2 ring-gold-500'
                  : 'opacity-60 hover:opacity-100',
              )}
            >
              <SmartImage
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
                fallbackClassName="absolute inset-0 h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
