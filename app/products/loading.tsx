import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSkeletonGrid } from '@/components/products/product-skeleton-grid';

export default function ProductsLoading() {
  return (
    <Container className="py-16">
      <div className="border-b border-ink-100 pb-8">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-10 w-64" />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Skeleton className="h-12 w-full max-w-sm" />
        <Skeleton className="h-12 w-32" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <div className="hidden space-y-6 lg:block">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
        <ProductSkeletonGrid count={9} />
      </div>
    </Container>
  );
}
