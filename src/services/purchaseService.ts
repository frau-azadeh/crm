import axios from "axios";
import { Purchase, PurchaseInput } from "@/types/purchase";

const API_URL = "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase";

export const addPurchase = async (
  purchase: PurchaseInput,
): Promise<Purchase> => {
  const res = await axios.post<Purchase>(API_URL, purchase);
  return res.data;
};

export const getCustomerPurchases = async (
  customerId: number,
): Promise<Purchase[]> => {
  const res = await axios.get<Purchase[]>(
    `${API_URL}?customerId=${customerId}`,
  );
  return res.data.map((p) => ({
    ...p,
    customerId: Number(p.customerId),
    amount: Number(p.amount),
  }));
};
