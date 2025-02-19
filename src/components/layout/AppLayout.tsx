"use client";

import { usePathname } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  return (
    <QueryProvider>
      {isAuthPage ? (
        <div className="h-screen flex items-center justify-center bg-gray-100">
          {children}
        </div>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
      <Toaster position="top-center" />
    </QueryProvider>
  );
}
