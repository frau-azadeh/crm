import axios from "axios";
import { Customer } from "@/types/customer";

const API_URL = "https://67b1b1393fc4eef538ea6972.mockapi.io/customers";

export const getCustomers = async (): Promise<Customer[]> => {
  const res = await axios.get<Customer[]>(API_URL);
  return res.data;
};

export const deleteCustomer = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addCustomer = async (customer: Omit<Customer, "id">) => {
  const res = await axios.post<Customer>(API_URL, customer);
  return res.data;
};