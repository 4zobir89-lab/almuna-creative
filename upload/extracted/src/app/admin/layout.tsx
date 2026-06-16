import { AdminLayout } from "@/components/layout/admin-layout";
import { Providers } from "@/components/layout/providers";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminLayout>{children}</AdminLayout>
    </Providers>
  );
}
