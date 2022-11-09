import moment from "moment";
import { useEffect, useState } from "react";
import { Order, Orders } from "../../../types/DTOs";

type TableColumn = keyof Order;
type TableProps = { orders: Orders };

export const Table = (p: TableProps) => {
  const [rows, setRows] = useState(p.orders);
  const [sortedBy, setSortedBy] = useState<TableColumn>();

  const sortRowsBy = (criterion: TableColumn) => {
    const newRows = [...rows];
    if (sortedBy === criterion) return setRows(newRows.reverse());
    newRows.sort((el1, el2) => {
      let comparisonElement1: string | number = el1[criterion];
      let comparisonElement2: string | number = el2[criterion];
      if (["id", "duration"].includes(criterion)) {
        comparisonElement1 = Number(comparisonElement1);
        comparisonElement2 = Number(comparisonElement2);
      }
      if (criterion === "date") {
        comparisonElement1 = moment(comparisonElement1).valueOf();
        comparisonElement2 = moment(comparisonElement2).valueOf();
      }
      return comparisonElement1 < comparisonElement2 ? -1 : 1;
    });
    setSortedBy(criterion);
    setRows(newRows);
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
