import { getCustomers } from "@/services/customerService";
import { useQuery } from "@tanstack/react-query";
import { Customer } from "@/types/customer";

export function useCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: getCustomers,
    staleTime: 1000 * 60 * 5,
  });
}
