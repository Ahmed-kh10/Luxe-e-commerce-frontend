import { getProducts } from '@/lib/api/products';
import { ProductCard } from './product-card';
import { ProductPagination } from './product-pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';

interface ProductGridProps {
  searchValue?: string;
  brandId?: number;
  typeId?: number;
  sort?: string;
  pageIndex: number;
}

const PAGE_SIZE = 9;

export async function ProductGrid({
  searchValue,
  brandId,
  typeId,
  sort,
  pageIndex,
}: ProductGridProps) {
  let result;

  try {
    result = await getProducts({
      searchValue,
      brandId,
      typeId,
      sort,
      pageIndex,
      pageSize: PAGE_SIZE,
    });
  } catch {
    return <ErrorState title="Couldn't load products" />;
  }

  if (result.data.length === 0) {
    return (
      <EmptyState
        title={
          searchValue ? `No results for "${searchValue}"` : 'No products found'
        }
        description={
          searchValue
            ? 'Try a different search term, or browse the full collection instead.'
            : 'Try adjusting your filters.'
        }
        actionLabel={searchValue ? 'Clear Search' : undefined}
        actionHref={searchValue ? '/products' : undefined}
      />
    );
  }

  const totalPages = Math.ceil(result.count / PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>

      <ProductPagination currentPage={pageIndex} totalPages={totalPages} />
    </div>
  );
}
