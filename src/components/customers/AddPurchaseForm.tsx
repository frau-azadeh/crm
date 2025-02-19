"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPurchase } from "@/services/purchaseService";
import { PurchaseInput } from "@/types/purchase";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  customerId: string;
  onSuccess: () => void;
}

export default function AddPurchaseForm({ customerId, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date | null>(new Date());
  const [amount, setAmount] = useState<string>("");

  const mutation = useMutation({
    mutationFn: addPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      queryClient.invalidateQueries({
        queryKey: ["customerPurchases", customerId],
      });
      toast.success("خرید با موفقیت ثبت شد");
      setAmount("");
      setDate(new Date());
      onSuccess();
    },
    onError: (error) => {
      console.error(error);
      toast.error("ثبت خرید با مشکل مواجه شد");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !date) {
      toast.error("مبلغ و تاریخ را وارد کنید");
      return;
    }

    const data: PurchaseInput = {
      customerId,
      amount: Number(amount),
      date: date.toISOString().split("T")[0],
    };

    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p>آیدی مشتری: {customerId}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="مبلغ"
        className="border p-2 w-full"
        required
      />
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        dateFormat="yyyy-MM-dd"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-500 text-white p-2 w-full"
      >
        {mutation.isPending ? "در حال ثبت..." : "ثبت خرید"}
      </button>
    </form>
  );
}
