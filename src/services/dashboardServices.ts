import axios from "axios";
import { Customer } from "@/types/customer";
import { Purchase } from "@/types/purchase";
import { TopCustomer } from "@/types/dashboard";

const CUSTOMERS_API_URL =
  "https://67b1b1393fc4eef538ea6972.mockapi.io/customers";
const PURCHASES_API_URL =
  "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase";

interface DashboardData {
  totalCustomers: number;
  totalPurchases: number;
  topCustomers: TopCustomer[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const [customersRes, purchasesRes] = await Promise.all([
    axios.get<Customer[]>(CUSTOMERS_API_URL),
    axios.get<Purchase[]>(PURCHASES_API_URL),
  ]);

  const customers = customersRes.data;
  const purchases = purchasesRes.data.map((p) => ({
    ...p,
    customerId: Number(p.customerId),
    amount: Number(p.amount),
  }));

  const totalCustomers = customers.length;
  const totalPurchases = purchases.length;

  const customerSpendings: Record<number, number> = {};
  purchases.forEach((purchase) => {
    if (!customerSpendings[purchase.customerId]) {
      customerSpendings[purchase.customerId] = 0;
    }
    customerSpendings[purchase.customerId] += purchase.amount;
  });

  const topCustomers: TopCustomer[] = customers
    .filter((c) => customerSpendings[c.id])
    .map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      totalAmount: customerSpendings[c.id],
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);

  return { totalCustomers, totalPurchases, topCustomers };
}
