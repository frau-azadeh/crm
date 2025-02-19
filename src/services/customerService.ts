import { customersApi } from "@/lib/axiosInstance";
import { Customer } from "@/types/customer";

export const fetchCustomers = async (
  userId: string | null,
  role: string | null,
): Promise<Customer[]> => {
  const url = role === "admin" ? "/customers" : `/customers?ownerId=${userId}`;
  const response = await customersApi.get<Customer[]>(url);
  return response.data;
};

export const addCustomer = async (
  customerData: Omit<Customer, "id" | "ownerId">,
) => {
  const userId = localStorage.getItem("userId"); // مالک مشتری را مشخص می‌کنیم
  if (!userId) throw new Error("کاربر لاگین نکرده است");

  const response = await customersApi.post<Customer>("/customers", {
    ...customerData,
    ownerId: userId,
  });
  return response.data;
};

export const deleteCustomer = async (customerId: string | number) => {
  const response = await customersApi.delete(`/customers/${customerId}`);
  return response.data;
};
