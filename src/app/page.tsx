"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboardServices";
import { DashboardContent } from "@/components/dashboard/dashboardContent";

export default function DashboardPage() {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") ?? null : null;
  const role = typeof window !== "undefined" ? localStorage.getItem("role") ?? null : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData", userId, role],
    queryFn: () => getDashboardData(role === "admin" ? undefined : (userId as string)),
    enabled: !!userId && !!role,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>مشکلی پیش آمد.</p>;

  return <DashboardContent totalCustomers={data!.totalCustomers} totalPurchases={data!.totalPurchases} purchasesChartData={data!.purchasesChartData} />;
}