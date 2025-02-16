"use client";

import { useCustomers } from "@/hooks/useCustomers";
import CustomerTable from "@/components/customers/CustomerTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "@/services/customerService";
import { Customer } from "@/types/customer";
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";
import AddCustomerForm from "@/components/customers/AddCustomersForm";
import EditCustomerForm from "@/components/customers/EditCustomersForm";
import { useState } from "react";

export default function CustomersPage() {
  const { data: customers, isLoading, error } = useCustomers();
  const queryClient = useQueryClient();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("مشتری با موفقیت حذف شد!");
      setIsDeleteModalOpen(false);
      setCustomerToDelete(null);
    },
    onError: () => toast.error("خطا در حذف مشتری"),
  });

  if (isLoading) return <p>در حال دریافت...</p>;
  if (error) return <p>خطا در دریافت داده</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* دکمه افزودن */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">لیست مشتریان</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
        >
          افزودن مشتری جدید
        </button>
      </div>

      {/* مودال افزودن مشتری */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="افزودن مشتری"
      >
        <AddCustomerForm
          onSuccess={() => {
            setIsAddModalOpen(false);
          }}
        />
      </Modal>

      {/* مودال ویرایش */}
      {editingCustomer && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCustomer(null);
          }}
          title="ویرایش مشتری"
        >
          <EditCustomerForm
            customerId={editingCustomer.id.toString()}
            initialData={{
              name: editingCustomer.name,
              email: editingCustomer.email,
              phone: editingCustomer.phone,
            }}
            onSuccess={() => {
              setIsEditModalOpen(false);
              setEditingCustomer(null);
              toast.success("ویرایش مشتری با موفقیت انجام شد!");
            }}
          />
        </Modal>
      )}

      {/* مودال تأیید حذف */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="حذف مشتری"
      >
        <p>آیا از حذف این مشتری مطمئن هستید؟</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            انصراف
          </button>
          <button
            onClick={() =>
              customerToDelete && deleteMutation.mutate(customerToDelete.id)
            }
            className="bg-red-600 text-white px-4 py-2 rounded"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "در حال حذف..." : "تایید حذف"}
          </button>
        </div>
      </Modal>

      {/* جدول مشتریان */}
      <CustomerTable
        customers={customers || []}
        onEdit={(customer: Customer) => {
          setEditingCustomer(customer);
          setIsEditModalOpen(true);
        }}
        onDelete={(customer: Customer) => {
          setCustomerToDelete(customer);
          setIsDeleteModalOpen(true);
        }}
      />
    </div>
  );
}
