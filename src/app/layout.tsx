import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css";
import AppLayout from "@/components/layout/AppLayout";

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
      <body className="bg-[#F5F3FF]">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
