"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Customer } from "@/types/customer";
import { Purchase } from "@/types/purchase";
import SalesChart from "@/components/SalesChart";

interface TopCustomer {
  id: number;
  name: string;
  email: string;
  totalAmount: number;
}

export default function DashboardPage() {
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [purchasingCustomers, setPurchasingCustomers] = useState<number>(0);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersRes = await axios.get<Customer[]>(
          "https://67b1b1393fc4eef538ea6972.mockapi.io/customers",
        );
        const purchasesRes = await axios.get<Purchase[]>(
          "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase",
        );

        const customers = customersRes.data;
        const purchases = purchasesRes.data;

        // 1. تعداد کل مشتریان
        setTotalCustomers(customers.length);

        // 2. تعداد مشتریانی که خرید کرده‌اند
        const purchasingCustomerIds = new Set(
          purchases.map((p) => p.customerId),
        );

        const purchasingCustomersCount = customers.filter((c) =>
          purchasingCustomerIds.has(Number(c.id)),
        ).length;

        setPurchasingCustomers(purchasingCustomersCount);

        // 3. پنج مشتری برتر بر اساس مبلغ خرید
        const customerSpendings: Record<number, number> = {};

        purchases.forEach((purchase) => {
          if (!customerSpendings[purchase.customerId]) {
            customerSpendings[purchase.customerId] = 0;
          }
          customerSpendings[purchase.customerId] += Number(purchase.amount);
        });

        const topCustomersData: TopCustomer[] = customers
          .filter((customer) => customerSpendings[Number(customer.id)])
          .map((customer) => ({
            id: Number(customer.id),
            name: customer.name,
            email: customer.email,
            totalAmount: customerSpendings[Number(customer.id)],
          }))
          .sort((a, b) => b.totalAmount - a.totalAmount)
          .slice(0, 5);

        setTopCustomers(topCustomersData);
      } catch (err) {
        setError("خطا در واکشی داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-5">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">داشبورد فروشگاه</h1>

      {/* کارت‌های تعداد مشتریان */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            تعداد کل مشتریان
          </h2>
          <p className="text-3xl font-bold mt-2">{totalCustomers}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            مشتریان خریدار
          </h2>
          <p className="text-3xl font-bold mt-2">{purchasingCustomers}</p>
        </div>
      </div>

      {/* 5 مشتری برتر */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          ۵ مشتری با بیشترین مبلغ خرید
        </h2>

        {topCustomers.length === 0 ? (
          <p className="text-gray-600">هنوز خریدی انجام نشده است.</p>
        ) : (
          <ul className="space-y-3">
            {topCustomers.map((customer) => (
              <li
                key={customer.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="text-lg font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
                <p className="font-bold text-green-600">
                  {customer.totalAmount.toLocaleString()} تومان
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* نمودار فروش */}
      <SalesChart />
    </div>
  );
}
