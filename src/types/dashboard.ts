export interface DashboardData {
  totalCustomers: number;
  totalPurchases: number;
  purchasesChartData: { date: string; totalAmount: number }[];
  topCustomers?: TopCustomer[]; // اینجا ? اضافه شده
}


export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalAmount: number;
}

