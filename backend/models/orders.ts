import { Knex } from "knex";
import { pg as db } from "../lib/knex/index";

const columns = [
  "orderId",
  "title",
  "areaName",
  "type",
  "date",
  "units",
  "duration",
  "deleted_at",
] as const;

type TableData = { [key in typeof columns[number]]?: string };

class OrdersModel {
  table = "orders";
  columns = columns;

  create = (data: TableData) => db(this.table).insert(data, this.columns);

  read = (conditions) =>
    db(this.table)
      .select(...this.columns)
      .where(conditions)
      .andWhere({ deleted_at: null });

  update = (conditions, data: TableData) =>
    db(this.table).where(conditions).update(data, this.columns);

  delete = (conditions) =>
    db(this.table)
      .where(conditions)
      .update({ deleted_at: Date() }, this.columns);
}
