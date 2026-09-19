import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function OrderNotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <FileQuestion className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-serif text-3xl text-ink-900">Order not found</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500">
        This order doesn&apos;t exist, or you don&apos;t have access to view it.
      </p>
      <Link href="/orders" className="mt-8">
        <Button variant="primary">Back to Orders</Button>
      </Link>
    </Container>
  );
}
