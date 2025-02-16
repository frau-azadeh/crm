import axios from "axios";
import { Purchase } from "@/types/purchase";

const API_URL = "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase";

export const getPurchases = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export async function getPurchasesByCustomerId(customerId: number) {
  const response = await axios.get<Purchase[]>(
    `https://67b1b1393fc4eef538ea6972.mockapi.io/purchase?customerId=${customerId}`,
  );
  return response.data;
}

export async function addPurchase(purchase: Omit<Purchase, "id">) {
  const response = await axios.post(
    "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase",
    {
      ...purchase,
      customerId: purchase.customerId.toString(), // مهم: اینجا عدد رو به رشته تبدیل می‌کنیم
    },
  );
  return response.data;
}

export const deletePurchase = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
