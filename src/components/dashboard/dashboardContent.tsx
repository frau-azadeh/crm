import { TopCustomer } from "@/types/dashboard";
import { StatisticsCard } from "./StatisticsCard";
import { TopCustomersList } from "./TopCustomersList";
import SalesChart from "./SalesChart";

interface DashboardContentProps {
  totalCustomers: number;
  totalPurchases: number;
  topCustomers: TopCustomer[];
}

export function DashboardContent({
  totalCustomers,
  totalPurchases,
  topCustomers,
}: DashboardContentProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">داشبورد فروشگاه</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatisticsCard title="تعداد کل مشتریان" value={totalCustomers} />
        <StatisticsCard title="تعداد کل خریدها" value={totalPurchases} />
      </div>
      <TopCustomersList customers={topCustomers} />
      <SalesChart />
    </div>
  );
}
