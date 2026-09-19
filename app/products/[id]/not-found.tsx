import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { PackageX } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <PackageX className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-serif text-3xl text-ink-900">
        This product no longer exists
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500">
        It may have sold out or been removed from the collection.
      </p>
      <Link href="/products" className="mt-8">
        <Button variant="primary">Back to Shop</Button>
      </Link>
    </Container>
  );
}
