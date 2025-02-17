"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Purchase } from "@/types/purchase";

interface DaySale {
  date: string;
  totalAmount: number;
}

export default function SalesChart() {
  const [daySales, setDaySales] = useState<DaySale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasesRes = await axios.get<Purchase[]>(
          "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase",
        );

        const purchases = purchasesRes.data;

        console.log("خریدها:", purchases); // بررسی داده‌های خام

        const salesByDay: Record<string, number> = {};

        purchases.forEach((purchase) => {
          if (!purchase.createdAt) return;

          const dateObj = new Date(purchase.createdAt);
          if (isNaN(dateObj.getTime())) return;

          const date = dateObj.toISOString().split("T")[0]; // 2024-02-18
          const amount = Number(purchase.amount) || 0;

          if (!salesByDay[date]) {
            salesByDay[date] = 0;
          }
          salesByDay[date] += amount;
        });

        console.log("مجموع فروش روزانه:", salesByDay);

        const salesData: DaySale[] = Object.entries(salesByDay).map(
          ([date, totalAmount]) => ({
            date,
            totalAmount,
          }),
        );

        salesData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        console.log("داده‌های نهایی نمودار:", salesData);

        setDaySales(salesData);
      } catch (err) {
        setError("خطا در واکشی داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">در حال بارگذاری نمودار...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (daySales.length === 0)
    return (
      <p className="text-center text-gray-500">
        داده‌ای برای نمایش وجود ندارد.
      </p>
    );

  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200 mt-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        نمودار فروش روزانه
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={daySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalAmount" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
