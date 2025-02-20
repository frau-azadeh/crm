"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  customerId: string;
  initialData: CustomerFormData;
  onSuccess: () => void;
}

export default function EditCustomerForm({
  customerId,
  initialData,
  onSuccess,
}: Props) {
  const { register, handleSubmit, reset } = useForm<CustomerFormData>({
    defaultValues: initialData,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CustomerFormData) => {
      return axios.put(
        `https://67b1b1393fc4eef538ea6972.mockapi.io/customers/${customerId}`,
        data,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      reset();
      onSuccess(); // فرم بسته بشه
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm mb-1">نام</label>
        <input
          {...register("name", { required: true })}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">ایمیل</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">تلفن</label>
        <input
          {...register("phone", { required: true })}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "در حال ویرایش..." : "ثبت ویرایش"}
      </button>
    </form>
  );
}
