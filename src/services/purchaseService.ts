import axios from "axios";
import { Purchase } from "@/types/purchase";

const API_URL = "https://67b1b1393fc4eef538ea6972.mockapi.io/purchase";

export async function getPurchasesByCustomerId(customerId: number) {
  const response = await axios.get<Purchase[]>(
    `${API_URL}?customerId=${customerId}`,
  );
  return response.data;
}

export async function addPurchase(purchase: Omit<Purchase, "id">) {
  const response = await axios.post(API_URL, purchase);
  return response.data;
}
