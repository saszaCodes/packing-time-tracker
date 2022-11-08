import { useQuery } from "react-query";
import { GET_ORDERS, ordersUrl } from "../../utils/constants";

export const useGetOrders = () => {
  const queryResponse = useQuery(GET_ORDERS, async () => {
    return await fetch(ordersUrl);
  });
  return { ...queryResponse };
};
