export type Order = {
  title: string;
  areaName: string;
  type: string;
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
