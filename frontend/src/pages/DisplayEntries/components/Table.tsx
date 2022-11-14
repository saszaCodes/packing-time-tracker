import { useMemo, useState } from "react";
import { Order, Orders } from "../../../types/DTOs";
import { sortOrdersBy } from "../../../utils/functions/sortOrdersBy";
import styled from "styled-components";
import { getTotalInIntervals } from "../../../utils/functions/getTotalInIntervals";
import moment from "moment";

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const Cell = styled.td`
  padding: 8px 12px;
  border: 1px solid lightgray;
`;

const ColHeader = styled(Cell)`
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
  :hover {
    background-color: rgb(235, 235, 235);
  }
`;

const CheckboxContainer = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 8px;
`;

const Input = styled.input`
  margin-right: 8px;
`;

type TableColumn = keyof Order;
type TableProps = { orders: Orders };

const columnLabels = {
  id: "ID",
  date: "Data",
  title: "Tytuł",
  areaName: "Nazwa obszaru",
  type: "Typ",
  duration: "Czas trwania",
  units: "Liczba sztuk",
} as const;

export const Table = (p: TableProps) => {
  const [rows, setRows] = useState(p.orders);
  const [sortedBy, setSortedBy] = useState<TableColumn>();
  const [showUnitsAsPercentage, setShowUnitsAsPercentage] =
    useState<boolean>(false);

  const sortRowsBy = (criterion: TableColumn) => {
    const newRows = [...rows];
    if (sortedBy === criterion) return setRows(newRows.reverse());
    const sortedRows = sortOrdersBy(newRows, criterion);
    setSortedBy(criterion);
    setRows(sortedRows);
  };

  const totalUnits = useMemo(
    () => getTotalInIntervals(p.orders, "units", "day"),
    [p.orders]
  );

  const generateRows = (
    columns: TableColumn[] = [
      "id",
      "date",
      "title",
      "areaName",
      "duration",
      "type",
      "units",
    ]
  ) => {
    const tableHeaders = (
      <tr>
        {columns.map((column) => (
          <ColHeader onClick={() => sortRowsBy(column)}>
            {columnLabels[column]}
          </ColHeader>
        ))}
      </tr>
    );

    const tableRows = rows.map((row) => (
      <tr>
        {columns.map((column) => {
          if (column === "units" && showUnitsAsPercentage) {
            const totalInDay = totalUnits.find(
              (el) => el.intervalStart === moment(row.date).format("DD-MM-YYYY")
            );
            const percentageString = totalInDay
              ? `${((row[column] / totalInDay.total) * 100).toFixed(1)}%`
              : "?";
            return <Cell>{percentageString}</Cell>;
          }
          return <Cell>{row[column]}</Cell>;
        })}
      </tr>
    ));

    return (
      <>
        {tableHeaders}
        {tableRows}
      </>
    );
  };

  return (
    <>
      <StyledTable>{generateRows()}</StyledTable>
      <CheckboxContainer>
        <Input
          type="checkbox"
          onChange={(e) => setShowUnitsAsPercentage(e.target.checked)}
        />
        <span>
          Pokaż liczbę sztuk jako procent całkowitej liczby sztuk w ciągu dnia
        </span>
      </CheckboxContainer>
    </>
  );
};
