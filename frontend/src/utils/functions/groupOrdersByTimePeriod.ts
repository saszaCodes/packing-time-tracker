// import moment from "moment";
// import { getOrdersResponse } from "../../mocks/handlers";
// import { Timescale } from "../../pages/DisplayEntries/components/Chart";
// import { sortOrdersBy } from "./sortOrdersBy";

// type TimescaleGroup = { type: "timescale"; value: Timescale };

// type Settings = TimescaleGroup;

// export const groupOrdersBy = (
//   orders: typeof getOrdersResponse["orders"],
//   settings: Settings
// ) => {
//   if (settings.type === "timescale") {
//     const groups: { [key: number]: typeof orders } = {};
//     orders.forEach((order) => {
//       const timePeriodStartDate = moment(order.date)
//         .startOf(settings.value)
//         .valueOf();
//       groups[timePeriodStartDate]
//         ? groups[timePeriodStartDate].push(order)
//         : (groups[timePeriodStartDate] = [order]);
//     });
//     const sortedGroupKeys = Object.values(groups).sort();
//     sortedGroupKeys.forEach();
//     return groups;
//   }
//   const startDate = moment(sortedOrders[0].date).startOf(timePeriod).valueOf();
//   const endDate = moment(sortedOrders[sortedOrders.length - 1].date)
//     .endOf(timePeriod)
//     .valueOf();
//   const groupedOrders: typeof getOrdersResponse["orders"][] = [];
//   for (
//     let i = startDate;
//     i < endDate;
//     i = moment(i).add(1, "week").startOf("week").valueOf()
//   ) {
//     groupedOrders.push(
//       sortedOrders.filter(
//         (order) =>
//           moment(order.date).valueOf() > i &&
//           moment(order.date).valueOf() < moment(i).endOf(timePeriod).valueOf()
//       )
//     );
//   }
//   return {
//     startDate,
//     endDate,
//     groupedOrders,
//   };
// };

export {};
