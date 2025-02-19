export interface Purchase {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  createdAt?: string;
}

export interface PurchaseInput {
  customerId: string;
  amount: number;
  date: string;
}
