import { useQuery } from "react-query";
import { ServerResponsePayloads } from "../../types/DTOs";
import { GET_ORDERS, ordersUrl } from "../../utils/constants";

export const useGetOrders = () => {
  const queryResponse = useQuery<ServerResponsePayloads["/orders"]["get"]>(
    GET_ORDERS,
    async () => await fetch(ordersUrl).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );
  return { ...queryResponse };
};
