import { StatisticsCard } from "./StatisticsCard";
import SalesChart from "./SalesChart";

interface DashboardContentProps {
  totalCustomers: number;
  totalPurchases: number;
  purchasesChartData: { date: string; totalAmount: number }[];
}

export function DashboardContent({ totalCustomers, totalPurchases, purchasesChartData }: DashboardContentProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">داشبورد فروشگاه</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatisticsCard title="تعداد کل مشتریان" value={totalCustomers} />
        <StatisticsCard title="تعداد کل خریدها" value={totalPurchases} />
      </div>
      <SalesChart data={purchasesChartData} />
    </div>
  );
}