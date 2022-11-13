import { useState } from "react";
import { Order, Orders } from "../../../types/DTOs";
import { sortOrdersBy } from "../../../utils/functions/sortOrdersBy";
import styled from "styled-components";

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

type TableColumn = keyof Order;
type TableProps = { orders: Orders };

export const Table = (p: TableProps) => {
  const [rows, setRows] = useState(p.orders);
  const [sortedBy, setSortedBy] = useState<TableColumn>();

  const sortRowsBy = (criterion: TableColumn) => {
    const newRows = [...rows];
    if (sortedBy === criterion) return setRows(newRows.reverse());
    const sortedRows = sortOrdersBy(newRows, criterion);
    setSortedBy(criterion);
    setRows(sortedRows);
  };

  const generateRows = (
    columns: TableColumn[] = [
      "date",
      "title",
      "areaName",
      "id",
      "duration",
      "type",
    ]
  ) => {
    const tableHeaders = (
      <tr>
        {columns.map((column) => (
          <ColHeader onClick={() => sortRowsBy(column)}>{column}</ColHeader>
        ))}
      </tr>
    );

    const tableRows = rows.map((row) => (
      <tr>
        {columns.map((column) => (
          <Cell>{row[column]}</Cell>
        ))}
      </tr>
    ));

    return (
      <>
        {tableHeaders}
        {tableRows}
      </>
    );
  };

  return <StyledTable>{generateRows()}</StyledTable>;
};
