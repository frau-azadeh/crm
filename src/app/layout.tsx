import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css";
import MainLayout from "@/components/layout/MainLayout";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "CRM",
  description: "CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
