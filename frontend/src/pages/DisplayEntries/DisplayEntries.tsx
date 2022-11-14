import { useEffect, useState } from "react";
import { useGetOrders } from "../../queries/hooks/useGetOrders";
import { Button } from "../../styledComponents/styledComponents";
import { Chart } from "./components/Chart";
import { Table } from "./components/Table";
import styled from "styled-components";
import { FilterBar } from "./components/FilterBar";
import { Orders } from "../../types/DTOs";

const ButtonsContainer = styled.div`
  margin-bottom: 12px;
`;

const ContentContainer = styled.div`
  padding: 12px;
`;

export const DisplayEntries = () => {
  const { data: fetchedOrders } = useGetOrders();
  const [orders, setOrders] = useState<Orders>();
  const [activeDisplay, setActiveDisplay] = useState<"table" | "chart">(
    "table"
  );
  const toggleDisplay = () => {
    if (activeDisplay === "table") return setActiveDisplay("chart");
    setActiveDisplay("table");
  };

  useEffect(() => {
    fetchedOrders && setOrders(fetchedOrders);
    console.log({ fetchedOrders });
  }, [fetchedOrders]);

  useEffect(() => {
    console.log({ orders });
  }, [orders]);

  console.log("RERENDER");

  return (
    <>
      {orders ? (
        <>
          <FilterBar
            orders={fetchedOrders || []}
            setFilteredOrders={setOrders}
          />
          <ContentContainer>
            {activeDisplay === "table" && <Table orders={orders} />}
            {activeDisplay === "chart" && <Chart orders={orders} />}
          </ContentContainer>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <ButtonsContainer>
        <Button disabled={activeDisplay === "table"} onClick={toggleDisplay}>
          Wyświetl w formie tabeli
        </Button>
        <Button disabled={activeDisplay === "chart"} onClick={toggleDisplay}>
          Wyświetl w formie wykresu
        </Button>
      </ButtonsContainer>
    </>
  );
};
