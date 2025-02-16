import { Customer } from "@/types/customer";
import axios from "axios";

const API_URL = "https://67b1b1393fc4eef538ea6972.mockapi.io/customers";

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get<Customer[]>(API_URL);
  return response.data;
};
