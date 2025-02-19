"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login";
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !isAuthPage) {
      router.push("/login");
    } else if (token && isAuthPage) {
      router.push("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [pathname, router, isAuthPage]);

  // تا وقتی که وضعیت احراز هویت چک نشده، هیچی نشون نده
  if (isCheckingAuth) {
    return null; // یا می‌تونی لودینگ بگذاری
  }

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
