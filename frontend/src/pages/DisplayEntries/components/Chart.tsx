import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Orders } from "../../../types/DTOs";
import { getTotalInIntervals } from "../../../utils/functions/getTotalInIntervals";
import styled from "styled-components";
import { Button } from "../../../styledComponents/styledComponents";

type ChartProps = { orders: Orders };

const Container = styled.div`
  display: flex;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Chart = (p: ChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [interval, setInterval] = useState<"day" | "week" | "month" | "year">(
    "day"
  );

  useEffect(() => {
    const totalPackingTimes = getTotalInIntervals(
      p.orders,
      "duration",
      interval
    );
    const totalUnits = getTotalInIntervals(p.orders, "units", interval);
    const newData = totalPackingTimes.map((totalPackingTime, index) => ({
      intervalStart: totalPackingTime.intervalStart,
      totalPackingTime: totalPackingTime.total,
      totalUnits: totalUnits[index].total,
      meanPackingTime: totalPackingTime.total / totalUnits[index].total,
    }));
    setData(newData);
  }, [p.orders, interval]);

  return (
    <Container>
      <BarChart data={data} width={400} height={400}>
        <XAxis dataKey="intervalStart" />
        <YAxis />
        <Bar label="Całkowity czas pakowania" dataKey="totalPackingTime" />
        <Bar label="Całkowita liczba sztuk" dataKey="totalUnits" />
        <Bar label="Średni czas pakowania" dataKey="meanPackingTime" />
        <Tooltip />
      </BarChart>
      <ButtonsContainer>
        <Button onClick={() => setInterval("day")}>Wyświetl według dni</Button>
        <Button onClick={() => setInterval("week")}>
          Wyświetl według tygodni
        </Button>
        <Button onClick={() => setInterval("month")}>
          Wyświetl według miesięcy
        </Button>
        <Button onClick={() => setInterval("year")}>Wyświetl według lat</Button>
      </ButtonsContainer>
    </Container>
  );
};
