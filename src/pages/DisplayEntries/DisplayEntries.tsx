import { useState } from "react";
import { useGetOrders } from "../../queries/hooks/useGetOrders";
import { Chart } from "./components/Chart";
import { Table } from "./components/Table";

export const DisplayEntries = () => {
  const { data: orders } = useGetOrders();
  const [activeDisplay, setActiveDisplay] = useState<"table" | "chart">(
    "table"
  );
  const toggleDisplay = () => {
    if (activeDisplay === "table") return setActiveDisplay("chart");
    setActiveDisplay("table");
  };

  return (
    <>
      <div>
        <button disabled={activeDisplay === "table"} onClick={toggleDisplay}>
          TABLE
        </button>
        <button disabled={activeDisplay === "chart"} onClick={toggleDisplay}>
          CHART
        </button>
      </div>
      {orders ? (
        <>
          <div>{activeDisplay === "table" && <Table orders={orders} />}</div>
          <div>{activeDisplay === "chart" && <Chart orders={orders} />}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
