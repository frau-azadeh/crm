import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customerService";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
};
