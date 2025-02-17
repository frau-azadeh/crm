"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboardServices";
import { DashboardContent } from "@/components/dashboard/dashboardContent";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>مشکلی پیش آمد.</p>;

  return <DashboardContent {...data!} />;
}
