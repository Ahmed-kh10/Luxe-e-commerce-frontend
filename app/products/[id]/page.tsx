import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getProductById } from '@/lib/api/products';
import { Container } from '@/components/ui/container';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ProductGallery } from '@/components/products/product-gallery';
import { AddToBasketBar } from '@/components/products/add-to-basket-bar';
import { RelatedProducts } from '@/components/products/related-products';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils/format';
import { WishlistButton } from '@/components/products/wishlist-button';
import { ViewTracker } from '@/components/products/view-tracker';
import { RecentlyViewedRail } from '@/components/products/recently-viewed-rail';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function getProductSafely(id: number) {
  try {
    return await getProductById(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductSafely(Number(id));

  if (!product) {
    return { title: 'Product Not Found — Luxe' };
  }

  return {
    title: `${product.name} — Luxe`,
    description: product.description?.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 155),
      images: product.pictureUrl ? [{ url: product.pictureUrl }] : [],
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProductSafely(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ViewTracker productId={product.id} />

      <Container className="py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery images={[product.pictureUrl]} alt={product.name} />

          <div className="flex flex-col">
            {product.productBrand && (
              <Badge variant="outline" className="w-fit">
                {product.productBrand}
              </Badge>
            )}

            <h1 className="mt-4 font-serif text-3xl leading-tight text-ink-900 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-2 text-sm uppercase tracking-wide text-ink-400">
              {product.productType}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <p className="font-serif text-2xl text-ink-900">
                {formatPrice(product.price)}
              </p>
              <WishlistButton product={product} size="lg" />
            </div>

            <div className="mt-6 border-t border-ink-100 pt-6">
              <p className="text-sm leading-relaxed text-ink-600">
                {product.description}
              </p>
            </div>

            <div className="mt-8 border-t border-ink-100 pt-8">
              <AddToBasketBar product={product} />
            </div>

            {/* Trust signals — small, restrained, not oversold */}
            <ul className="mt-8 space-y-2 text-xs text-ink-500">
              <li>Free shipping on orders over $150</li>
              <li>30-day return policy</li>
              <li>Secure checkout, every time</li>
            </ul>
          </div>
        </div>
      </Container>

      <Suspense fallback={null}>
        <RelatedProducts
          typeId={product.categoryId}
          excludeProductId={product.id}
        />
      </Suspense>

      <RecentlyViewedRail excludeId={product.id} />
    </>
  );
}
