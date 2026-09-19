"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <ShieldAlert className="h-8 w-8 text-ink-300" />
        <p className="text-sm text-ink-500">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}