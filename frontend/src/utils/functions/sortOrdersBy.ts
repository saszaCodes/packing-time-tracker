import moment from "moment";
import { Order, Orders } from "../../types/DTOs";

export const sortOrdersBy = (orders: Orders, criterion: keyof Order) => {
  const newOrders = [...orders];
  newOrders.sort((el1, el2) => {
    let comparisonElement1: string | number = el1[criterion];
    let comparisonElement2: string | number = el2[criterion];
    if (["id", "duration"].includes(criterion)) {
      comparisonElement1 = Number(comparisonElement1);
      comparisonElement2 = Number(comparisonElement2);
    }
    if (criterion === "date") {
      comparisonElement1 = moment(comparisonElement1).valueOf();
      comparisonElement2 = moment(comparisonElement2).valueOf();
    }
    return comparisonElement1 < comparisonElement2 ? -1 : 1;
  });
  return newOrders;
};
