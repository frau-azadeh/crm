"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { addCustomer } from "@/services/customerService";
import toast from "react-hot-toast";

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onSuccess: () => void;
}

export default function AddCustomersForm({ onSuccess }: Props) {
  const { register, handleSubmit, reset } = useForm<CustomerFormData>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      reset();
      toast.success("مشتری با موفقیت اضافه شد!");
      onSuccess();
    },
    onError: () => {
      toast.error("ثبت مشتری با خطا مواجه شد.");
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name", { required: true })}
        className="border p-2 rounded w-full"
        placeholder="نام"
      />
      <input
        type="email"
        {...register("email", { required: true })}
        className="border p-2 rounded w-full"
        placeholder="ایمیل"
      />
      <input
        {...register("phone", { required: true })}
        className="border p-2 rounded w-full"
        placeholder="تلفن"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "در حال ارسال..." : "ثبت مشتری"}
      </button>
    </form>
  );
}
