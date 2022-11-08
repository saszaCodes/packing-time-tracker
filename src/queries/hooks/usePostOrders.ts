import { FieldValues } from "react-hook-form";
import { useMutation } from "react-query";
import { ordersUrl, POST_ORDERS } from "../../utils/constants";

export const usePostOrders = () => {
  const mutationResponse = useMutation(
    POST_ORDERS,
    async (formValues: FieldValues) => {
      console.log({ formValues });
      return await fetch(ordersUrl, {
        method: "POST",
        body: JSON.stringify(formValues),
      });
    }
  );
  return { ...mutationResponse };
};
