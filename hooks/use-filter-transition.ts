import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Wraps router navigation in a React transition so the UI never fully
 * blocks while new server data streams in — the current content stays
 * interactive and visible (dimmed) instead of flashing to a blank state.
 */
export function useFilterTransition() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function navigate(url: string) {
    startTransition(() => {
      router.push(url, { scroll: false });
    });
  }

  return { navigate, isPending };
}
