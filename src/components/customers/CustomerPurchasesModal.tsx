"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomerPurchases, addPurchase } from "@/services/purchaseService";
import { PurchaseInput } from "@/types/purchase";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

interface Props {
  customerId: number;
  onClose: () => void;
}

export default function CustomerPurchasesModal({ customerId, onClose }: Props) {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date | null>(new Date());
  const [amount, setAmount] = useState("");

  const { data: purchases, isLoading } = useQuery({
    queryKey: ["customerPurchases", customerId],
    queryFn: () => getCustomerPurchases(customerId),
  });

  const mutation = useMutation({
    mutationFn: addPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerPurchases", customerId] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      setAmount("");
      setDate(new Date());
      toast.success("خرید جدید با موفقیت ثبت شد");
    },
    onError: () => {
      toast.error("ثبت خرید با مشکل مواجه شد");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !amount) return toast.error("لطفاً مبلغ و تاریخ را وارد کنید");

    const data: PurchaseInput = {
      customerId,
      amount: Number(amount),
      date: date.toISOString().split("T")[0],
    };

    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
      <h2 className="text-lg font-semibold mb-3">خریدهای مشتری</h2>

      {isLoading ? (
        <p>در حال بارگذاری...</p>
      ) : purchases && purchases.length > 0 ? (
        <ul className="mb-4 space-y-2">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="border-b pb-1">
              مبلغ: {purchase.amount.toLocaleString()} تومان - تاریخ: {purchase.date}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500 mb-4">خریدی انجام نشده</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label>مبلغ</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>تاریخ خرید</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="yyyy-MM-dd"
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white p-2 w-full"
        >
          {mutation.isPending ? "در حال ثبت..." : "ثبت خرید"}
        </button>
      </form>

      <button onClick={onClose} className="bg-red-500 text-white p-2 mt-3 w-full">بستن</button>
    </div>
  );
}
