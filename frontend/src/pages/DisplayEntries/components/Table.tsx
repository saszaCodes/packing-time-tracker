import moment from "moment";
import { useEffect, useState } from "react";
import { Order, Orders } from "../../../types/DTOs";
import { sortOrdersBy } from "../../../utils/functions/sortOrdersBy";

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
          <th onClick={() => sortRowsBy(column)}>{column}</th>
        ))}
      </tr>
    );

    const tableRows = rows.map((row) => (
      <tr>
        {columns.map((column) => (
          <td>{row[column]}</td>
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

  return <table>{generateRows()}</table>;
};
