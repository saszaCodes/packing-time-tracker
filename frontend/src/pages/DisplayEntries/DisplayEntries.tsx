import { useState } from "react";
import { useGetOrders } from "../../queries/hooks/useGetOrders";
import { Button } from "../../styledComponents/styledComponents";
import { Chart } from "./components/Chart";
import { Table } from "./components/Table";
import styled from "styled-components";

const ButtonsContainer = styled.div`
  margin-bottom: 12px;
`;

const ContentContainer = styled.div`
  padding: 12px;
`;

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
      <ButtonsContainer>
        <Button disabled={activeDisplay === "table"} onClick={toggleDisplay}>
          Wyświetl w formie tabeli
        </Button>
        <Button disabled={activeDisplay === "chart"} onClick={toggleDisplay}>
          Wyświetl w formie wykresu
        </Button>
      </ButtonsContainer>
      {orders ? (
        <ContentContainer>
          {activeDisplay === "table" && <Table orders={orders} />}
          {activeDisplay === "chart" && <Chart orders={orders} />}
        </ContentContainer>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
