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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-[#DDD6FE]">
          <tr>
            <th className="p-3 text-right">نام</th>
            <th className="p-3 text-right">ایمیل</th>
            <th className="p-3 text-right">تلفن</th>
            <th className="p-3 text-right">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
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

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <span>
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
      </div>
    </div>
  );
}
