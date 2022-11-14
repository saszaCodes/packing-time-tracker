import { orderTypes } from "../utils/constants";

export type OrderType = typeof orderTypes[number];

export type Order = {
  title: string;
  areaName: string;
  type: OrderType;
  id: number;
  date: string;
  duration: number;
  units: number;
};

export type Orders = Order[];

export type ServerResponsePayloads = {
  "/orders": {
    get: Orders;
    post: Orders;
  };
};
