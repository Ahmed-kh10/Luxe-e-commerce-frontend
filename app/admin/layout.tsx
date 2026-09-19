import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-ink-50/50 p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
