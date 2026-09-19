import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { ProductSearch } from '@/components/products/product-search';
import { ProductSort } from '@/components/products/product-sort';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductSkeletonGrid } from '@/components/products/product-skeleton-grid';
import { getProductBrands, getProductTypes } from '@/lib/api/products';
import { MobileFilterDrawer } from '@/components/products/mobile-filter-drawer';
import { ProductsGridWrapper } from '@/components/products/products-grid-wrapper';

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    brandId?: string;
    typeId?: string;
    sort?: string;
    pageIndex?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const [brands, types] = await Promise.all([
    getProductBrands().catch(() => []),
    getProductTypes().catch(() => []),
  ]);

  const pageIndex = params.pageIndex ? Number(params.pageIndex) : 1;

  return (
    <Container className="py-16">
      {/* Page header */}
      <div className="border-b border-ink-100 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          The Collection
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-900">All Products</h1>
      </div>

      {/* Search + Sort bar */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <ProductSearch />
        </div>
        <div className="flex items-center gap-3">
          <MobileFilterDrawer brands={brands} types={types} />
          <ProductSort />
        </div>
      </div>

      <ProductsGridWrapper>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
          {/* Desktop: persistent sidebar. Mobile: trigger + bottom sheet. */}
          <div className="hidden lg:block">
            <ProductFilters brands={brands} types={types} />
          </div>

          {/* Key forces remount + fresh Suspense fallback whenever filters/page change */}
          <Suspense
            key={JSON.stringify(params)}
            fallback={<ProductSkeletonGrid count={PAGE_SIZE_FALLBACK} />}
          >
            <ProductGrid
              searchValue={params.search}
              brandId={params.brandId ? Number(params.brandId) : undefined}
              typeId={params.typeId ? Number(params.typeId) : undefined}
              sort={params.sort}
              pageIndex={pageIndex}
            />
          </Suspense>
        </div>
      </ProductsGridWrapper>
    </Container>
  );
}

const PAGE_SIZE_FALLBACK = 9;
