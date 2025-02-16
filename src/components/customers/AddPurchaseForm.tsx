"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  amount: number;
  date: string;
}

interface Props {
  customerId: number;
  onSuccess: () => void;
}

export default function AddPurchaseForm({ customerId, onSuccess }: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post("https://67b1b1393fc4eef538ea6972.mockapi.io/purchase", {
        ...data,
        customerId: customerId.toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("خرید با موفقیت ثبت شد!");
      reset();
      onSuccess();
    },
    onError: () => {
      toast.error("مشکلی در ثبت خرید پیش آمد.");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="number"
        {...register("amount", { required: true })}
        placeholder="مبلغ"
        className="border p-2 rounded w-full"
      />
      <input
        type="date"
        {...register("date", { required: true })}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "در حال ثبت..." : "ثبت خرید"}
      </button>
    </form>
  );
}
