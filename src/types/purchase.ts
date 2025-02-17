export interface Purchase {
  id: number;
  customerId: number;
  amount: number;
  date: string;
}

export type PurchaseInput = Omit<Purchase, "id">;
