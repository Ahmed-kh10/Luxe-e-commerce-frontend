import { getProducts } from '@/lib/api/products';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { ProductDto } from '@/types/api';
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll';

export async function FeaturedProducts() {
  let products: ProductDto[] = [];
  let hasError = false;

  try {
    const result = await getProducts({ pageSize: 4, pageIndex: 1 });
    products = result.data;
  } catch {
    hasError = true;
    products = [];
  }

  return (
    <section className="border-t border-ink-100 py-24">
      <Container>
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            eyebrow="Handpicked"
            title="Featured Products"
            description="A rotating edit of pieces our team stands behind completely."
          />
          <Link href="/products" className="hidden sm:block">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {hasError && (
          <p className="mt-12 text-sm text-ink-500">
            We couldn&apos;t load featured products right now. Please check back
            shortly.
          </p>
        )}

        {!hasError && products.length === 0 && (
          <p className="mt-12 text-sm text-ink-500">
            No products available yet.
          </p>
        )}

        {products.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <RevealOnScroll key={product.id} delayMs={index * 80}>
                <ProductCard product={product} priority={index < 2} />
              </RevealOnScroll>
            ))}
          </div>
        )}

        <Link href="/products" className="mt-10 block sm:hidden">
          <Button variant="outline" className="w-full">
            View All
          </Button>
        </Link>
      </Container>
    </section>
  );
}
