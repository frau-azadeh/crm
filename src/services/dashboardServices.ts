import { customersApi } from "@/lib/axiosInstance";
import { DashboardData } from "@/types/dashboard";
import { Purchase } from "@/types/purchase";
import { Customer } from "@/types/customer";

export const getDashboardData = async (userId?: string): Promise<DashboardData> => {
  const [customersRes, purchasesRes] = await Promise.all([
    customersApi.get<Customer[]>(userId ? `/customers?ownerId=${userId}` : "/customers"),
    customersApi.get<Purchase[]>("/purchase"),
  ]);

  const customers = customersRes.data;
  const purchases = purchasesRes.data;

  const filteredPurchases = userId ? purchases.filter((p) => customers.some((c) => c.id === p.customerId.toString())) : purchases;

  const salesByDay: Record<string, number> = {};
  filteredPurchases.forEach((purchase) => {
    const date = purchase.date;
    if (!salesByDay[date]) salesByDay[date] = 0;
    salesByDay[date] += purchase.amount;
  });

  const purchasesChartData = Object.entries(salesByDay).map(([date, totalAmount]) => ({ date, totalAmount }));
  purchasesChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    totalCustomers: customers.length,
    totalPurchases: filteredPurchases.length,
    purchasesChartData,
  };
};
