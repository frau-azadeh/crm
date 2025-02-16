import { useState } from "react";
import { getPurchasesByCustomerId } from "@/services/purchaseService";
import { Customer } from "@/types/customer";
import { Purchase } from "@/types/purchase";
import { Trash2, Edit, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";
import AddPurchaseForm from "./AddPurchaseForm";

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export default function CustomerTable({ customers, onEdit, onDelete }: Props) {
  const [selectedPurchases, setSelectedPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [errorPurchases, setErrorPurchases] = useState(false);

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handleShowPurchases = async (customerId: number) => {
    try {
      setSelectedCustomerId(customerId);
      setLoadingPurchases(true);
      setIsPurchaseModalOpen(true);
      const purchases = await getPurchasesByCustomerId(customerId);
      setSelectedPurchases(purchases);
      setErrorPurchases(false);
    } catch (error) {
      setErrorPurchases(true);
      toast.error("خطا در دریافت خریدهای مشتری");
    } finally {
      setLoadingPurchases(false);
    }
  };

  return (
    <div>
      <table className="w-full bg-white rounded shadow text-right">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="p-3">شناسه</th>
            <th className="p-3">نام</th>
            <th className="p-3">ایمیل</th>
            <th className="p-3">تلفن</th>
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="p-3">{customer.id}</td>
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3 flex gap-3 items-center">
                <button
                  className="text-blue-600 flex items-center gap-1"
                  onClick={() => handleShowPurchases(customer.id)}
                >
                  <ShoppingBag size={16} />
                  خریدها
                </button>

                <button
                  className="text-green-600 flex items-center gap-1"
                  onClick={() => onEdit(customer)}
                >
                  <Edit size={16} />
                  ویرایش
                </button>

                <button
                  className="text-red-600 flex items-center gap-1"
                  onClick={() => onDelete(customer)}
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="خریدهای مشتری"
      >
        {loadingPurchases && <p>در حال دریافت...</p>}
        {errorPurchases && <p className="text-red-600">خطا در دریافت خریدها</p>}

        {!loadingPurchases && !errorPurchases && (
          <>
            {selectedPurchases.length === 0 ? (
              <p className="text-gray-600">خریدی ثبت نشده است.</p>
            ) : (
              selectedPurchases.map((p) => (
                <div key={p.id} className="border p-2 my-2">
                  مبلغ: {p.amount} - تاریخ: {p.date}
                </div>
              ))
            )}

            {selectedCustomerId && (
              <>
                <h4 className="mt-4 font-bold">ثبت خرید جدید</h4>
                <AddPurchaseForm
                  customerId={selectedCustomerId}
                  onSuccess={() => handleShowPurchases(selectedCustomerId)}
                />
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
