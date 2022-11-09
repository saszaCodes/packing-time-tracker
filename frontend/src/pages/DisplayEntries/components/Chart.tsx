import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { sortOrdersBy } from "../../../utils/functions/sortOrdersBy";
import { Orders } from "../../../types/DTOs";

export type Timescale = "day" | "week" | "month";
// type Value = "meanPackingTime" | "totalPackingTime" | "totalUnits";
// type ChartData = (typeof getOrdersResponse['orders'] & { dayStart: number, weekStart: number, monthStart: number })[]
type ChartData = Orders;
type ChartProps = { orders: Orders };

export const Chart = (p: ChartProps) => {
  // const [timescale, setTimescale] = useState<Timescale>("day");
  // const [valuesShown, setValuesShown] = useState<Record<Value, boolean>>({
  //   totalPackingTime: true,
  //   meanPackingTime: true,
  //   totalUnits: true,
  // });
  const [data, setData] = useState<ChartData>();

  useEffect(() => {
    const newData = sortOrdersBy(p.orders, "date");
    setData(newData);
  }, [p.orders]);

  // const toggleValueShown = (value: Value) => {
  //   const newValuesShown = { ...valuesShown };
  //   newValuesShown[value] = !newValuesShown[value];
  //   setValuesShown(newValuesShown);
  // };

  // const getOrrdersWithStartDates = (orders: typeof getOrdersResponse['orders']) => orders.map((order) => ({
  //   ...order,
  //   dayStart: moment(order.)
  // }))

  // const getTotal = (value: "units" | "packingTime", timescale: Timescale) => {
  //   if (value === 'packingTime') {

  //   }
  // };

  return (
    <>
      <BarChart data={data} width={400} height={400}>
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="duration" />
        <Tooltip />
      </BarChart>
      {/* TODO: fix typing to not use 'as' */}
      {/* <select onChange={(e) => setTimescale(e.target.value as Timescale)}>
        <option value="day">Dzień</option>
        <option value="week">Tydzień</option>
        <option value="month">Miesiąc</option>
      </select> */}
      {/* <button onClick={() => toggleValueShown("meanPackingTime")}>
        Przełącz widoczność średniego czasu pakowania
      </button>
      <button onClick={() => toggleValueShown("totalPackingTime")}>
        Przełącz widoczność całkowitego czasu pakowania
      </button>
      <button onClick={() => toggleValueShown("totalUnits")}>
        Przełącz widoczność całkowitej liczby jednostek
      </button> */}
    </>
  );
};
