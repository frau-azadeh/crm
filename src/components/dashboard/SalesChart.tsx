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

interface SalesChartProps {
  data: { date: string; totalAmount: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
  if (data.length === 0)
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
        <BarChart data={data}>
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
