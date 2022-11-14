import moment from "moment";
import { Orders } from "../../types/DTOs";

type FilterOrdersArgs = {
  orders: Orders;
  config:
    | { by: "type" | "title"; filter: string }
    | { by: "date"; from?: number; to?: number };
};

export const filterOrders = ({ orders, config }: FilterOrdersArgs) => {
  const newOrders = [...orders];
  switch (config.by) {
    case "date":
      if (!config.from && !config.to) return orders;
      return newOrders.filter((order) => {
        const date = moment(order.date).valueOf();
        const from = config.from ? config.from : 0;
        const to = config.to || Number.MAX_SAFE_INTEGER;
        return from <= date && date <= to;
      });
    case "title":
      return newOrders.filter((order) => order.title.includes(config.filter));
    case "type":
      return newOrders.filter((order) => order.type === config.filter);
  }
};
