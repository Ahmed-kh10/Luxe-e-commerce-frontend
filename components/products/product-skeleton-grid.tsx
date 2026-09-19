import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-1/3" />
          <Skeleton className="mt-3 h-5 w-1/4" />
        </div>
      ))}
    </div>
  );
}
