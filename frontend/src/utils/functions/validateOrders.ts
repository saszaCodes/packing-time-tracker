import { Order, Orders } from "../../types/DTOs";
import { ordersValidationRules } from "../constants";

export const validateOrders = (orders: Orders) => {
  console.log({ orders });
  orders.forEach((order) => {
    const orderProperties = Object.keys(order) as (keyof Order)[];
    console.log(orderProperties);
    const validationRulesKeys = Object.keys(ordersValidationRules);
    console.log(validationRulesKeys);
    orderProperties.forEach((property) => {
      if (validationRulesKeys.includes(property)) {
        const value = order[property];
        console.log({ value });
        // TODO - remove @ts-ignore
        // @ts-ignore
        const regExp: RegExp = ordersValidationRules[property];
        console.log({ regExp });
        if (!regExp.test(String(value))) return false;
      }
    });
  });
  return true;
};
