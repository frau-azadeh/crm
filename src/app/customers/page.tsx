"use client";

import { useCustomers } from "@/hooks/useCustomers";

export default function CustomersPage() {
  const { data: customers, isLoading, error } = useCustomers();

  if (isLoading) {
    return <p>در حال دریافت اطلاعات...</p>;
  }

  if (error) {
    return <p className="text-red-600">خطا در دریافت اطلاعات</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">لیست مشتریان</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto text-right">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="p-3">شناسه</th>
              <th className="p-3">نام</th>
              <th className="p-3">ایمیل</th>
              <th className="p-3">تلفن</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{customer.id}</td>
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
