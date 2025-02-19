import { customersApi } from "@/lib/axiosInstance";
import { PurchaseInput, Purchase } from "@/types/purchase";

export const getCustomerPurchases = async (
  customerId: string,
): Promise<Purchase[]> => {
  const response = await customersApi.get<Purchase[]>(`/purchase`);
  return response.data.filter((purchase) => purchase.customerId === customerId);
};

export const addPurchase = async (purchaseData: PurchaseInput) => {
  const response = await customersApi.post<Purchase>(`/purchase`, purchaseData);
  return response.data;
};
