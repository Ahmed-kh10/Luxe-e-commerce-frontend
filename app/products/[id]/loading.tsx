import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailsLoading() {
  return (
    <Container className="py-10">
      <Skeleton className="h-4 w-64" />

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Skeleton className="aspect-[4/5] w-full" />

        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="mt-4 h-8 w-1/4" />
          <Skeleton className="mt-6 h-24 w-full" />
          <Skeleton className="mt-6 h-12 w-full" />
        </div>
      </div>
    </Container>
  );
}
