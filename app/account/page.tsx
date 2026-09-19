'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="heading-accent pb-4 font-serif text-xl text-ink-900">
        Profile
      </h2>

      <dl className="mt-8 max-w-sm space-y-6">
        <div className="border-b border-ink-100 pb-4">
          <dt className="text-xs uppercase tracking-wide text-ink-400">
            Full Name
          </dt>
          <dd className="mt-1 text-sm text-ink-900">{user?.displayName}</dd>
        </div>

        <div className="border-b border-ink-100 pb-4">
          <dt className="text-xs uppercase tracking-wide text-ink-400">
            Email
          </dt>
          <dd className="mt-1 text-sm text-ink-900">{user?.email}</dd>
        </div>
      </dl>
    </div>
  );
}
