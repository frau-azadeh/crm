import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css";
import { Main } from "next/document";
import MainLayout from "./components/layout/MainLayout";

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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
