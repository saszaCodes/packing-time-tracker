import moment from "moment";
import { Order, Orders } from "../../types/DTOs";
import { filterOrders } from "./filterOrders";
import { sortOrdersBy } from "./sortOrdersBy";

export const getTotalInIntervals = (
  orders: Orders,
  totalOf: keyof Pick<Order, "duration" | "units">,
  interval: "day" | "week" | "month" | "year"
) => {
  if (orders.length === 0) return [];
  if (orders.length === 1)
    return [{ intervalStart: orders[0].date, total: orders[0][totalOf] }];
  const sortedOrders = sortOrdersBy(orders, "date");
  const earliestOrderDate = moment(sortedOrders[0].date)
    .startOf(interval)
    .valueOf();
  const latestOrderDate = moment(sortedOrders[sortedOrders.length - 1].date)
    .startOf(interval)
    .valueOf();
  let curIntervalStart = earliestOrderDate;
  const totals = [];
  while (curIntervalStart <= latestOrderDate) {
    const intervalStart = curIntervalStart;
    const nextIntervalStart = moment(intervalStart).add(1, interval).valueOf();
    let format: string;
    const filteredOrders = filterOrders({
      orders,
      config: {
        by: "date",
        from: intervalStart,
        to: nextIntervalStart - 1,
      },
    });
    let total = 0;
    filteredOrders.forEach((order) => (total += order[totalOf]));
    if (interval === "day") format = "DD-MM-YYYY";
    else if (interval === "week") format = "DD-MM-YYYY";
    else if (interval === "month") format = "MM-YYYY";
    else format = "YYYY";
    const totalObj = {
      intervalStart: moment(intervalStart).format(format),
      total,
    };
    totals.push(totalObj);
    curIntervalStart = nextIntervalStart;
  }
  return totals;
};
