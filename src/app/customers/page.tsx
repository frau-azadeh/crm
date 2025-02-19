"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers, deleteCustomer } from "@/services/customerService";
import { useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import AddCustomersForm from "@/components/customers/AddCustomersForm";
import EditCustomerForm from "@/components/customers/EditCustomersForm";
import CustomerPurchasesModal from "@/components/customers/CustomerPurchasesModal";
import Modal from "@/components/customers/ModalCustomer";
import toast from "react-hot-toast";
import { Customer } from "@/types/customer";

export default function CustomersPage() {
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers", userId, role],
    queryFn: () => fetchCustomers(userId, role),
    enabled: !!userId && !!role,
  });

  const mutationDelete = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers", userId, role] });
      toast.success("مشتری با موفقیت حذف شد!");
    },
    onError: () => {
      toast.error("حذف مشتری با خطا مواجه شد.");
    },
  });

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isPurchasesModalOpen, setPurchasesModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      mutationDelete.mutate(selectedCustomer.id);
    }
    setConfirmModalOpen(false);
    setSelectedCustomer(null);
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">لیست مشتریان</h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          اضافه کردن مشتری
        </button>
      </div>

      <CustomerTable
        customers={customers}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setEditModalOpen(true);
        }}
        onDelete={handleDeleteCustomer}
        onShowPurchases={(customer) => {
          setSelectedCustomer(customer);
          setPurchasesModalOpen(true);
        }}
      />

      {/* مودال اضافه کردن مشتری */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <AddCustomersForm onSuccess={() => setAddModalOpen(false)} />
      </Modal>

      {/* مودال ویرایش مشتری */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        {selectedCustomer && (
          <EditCustomerForm
            customerId={selectedCustomer.id}
            initialData={{
              name: selectedCustomer.name,
              email: selectedCustomer.email,
              phone: selectedCustomer.phone,
            }}
            onSuccess={() => {
              setEditModalOpen(false);
              toast.success("ویرایش مشتری با موفقیت انجام شد!");
            }}
          />
        )}
      </Modal>

      {/* مودال نمایش خریدهای مشتری */}
      <Modal isOpen={isPurchasesModalOpen} onClose={() => setPurchasesModalOpen(false)}>
        {selectedCustomer && (
          <CustomerPurchasesModal
            customerId={selectedCustomer.id}
            onClose={() => setPurchasesModalOpen(false)}
          />
        )}
      </Modal>

      {/* مودال تایید حذف */}
      <Modal isOpen={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <div className="text-center">
          <p className="mb-4">
            آیا از حذف مشتری{" "}
            <span className="font-bold">{selectedCustomer?.name}</span> مطمئن هستید؟
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              بله، حذف شود
            </button>
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              انصراف
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
