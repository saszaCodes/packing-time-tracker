import { pg as db } from "../lib/knex/index";

type OrderEntry = Partial<{
  title: string;
  areaName: string;
  type: string;
  orderId: number;
  date: string;
  duration: number;
  units: number;
  deleted_at: number;
}>;

type Conditions = Omit<OrderEntry, "deleted_at">;

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

type TableData = { [key in typeof columns[number]]?: number | string };

export class OrdersModel {
  private table = "orders";
  private columns = columns;

  create = (data: TableData) =>
    db<OrderEntry>(this.table).insert(data, this.columns);

  read = (conditions?: Conditions) =>
    db<OrderEntry>(this.table)
      .select(...this.columns)
      .where({ deleted_at: null, ...conditions });

  update = (conditions: Conditions, data: TableData) =>
    db<OrderEntry>(this.table).where(conditions).update(data, this.columns);

  delete = (conditions: Conditions) =>
    db<OrderEntry>(this.table)
      .where(conditions)
      .update({ deleted_at: Date.now() }, this.columns);
}
