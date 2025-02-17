import { Customer } from "@/types/customer";
import {
  PencilSquareIcon,
  TrashIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onShowPurchases: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
  onShowPurchases,
}: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const paginatedCustomers = customers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const totalPages = Math.ceil(customers.length / pageSize);

  return (
    <div>
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-right">نام</th>
            <th className="p-3 text-right">ایمیل</th>
            <th className="p-3 text-right">تلفن</th>
            <th className="p-3 text-right">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3 flex gap-3">
                <button onClick={() => onEdit(customer)}>
                  <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button onClick={() => onDelete(customer)}>
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
                <button onClick={() => onShowPurchases(customer)}>
                  <ShoppingBagIcon className="h-5 w-5 text-green-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 mx-1 rounded ${
                page === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
