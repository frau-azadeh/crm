"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPurchase } from "@/services/purchaseService";
import { PurchaseInput } from "@/types/purchase";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  customerId: number;
  onSuccess: () => void;
}

export default function AddPurchaseForm({ customerId, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date | null>(new Date());

  const mutation = useMutation({
    mutationFn: addPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      queryClient.invalidateQueries({ queryKey: ["customerPurchases", customerId] });
      toast.success("خرید با موفقیت ثبت شد");
      onSuccess();
    },
    onError: () => {
      toast.error("ثبت خرید با مشکل مواجه شد");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amountValue = Number(formData.get("amount"));

    if (!amountValue || !date) {
      toast.error("مبلغ و تاریخ را وارد کنید");
      return;
    }

    const data: PurchaseInput = {
      customerId,
      amount: amountValue,
      date: date.toISOString().split("T")[0],
    };

    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>آیدی مشتری: {customerId}</p>
      <input name="amount" type="number" placeholder="مبلغ" required />
      <DatePicker selected={date} onChange={(d) => setDate(d)} dateFormat="yyyy-MM-dd" />
      <button type="submit">ثبت خرید</button>
    </form>
  );
}
