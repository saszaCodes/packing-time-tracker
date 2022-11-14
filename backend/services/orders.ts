import { OrdersModel } from "../models/orders";
import express from "express";
import { ExpressRouterHandler, Order } from "../types/types";

export const ordersService = new (class OrdersService {
  orders = new OrdersModel();

  getOrders: ExpressRouterHandler = async (req, res, next) => {
    try {
      const orders = await this.orders.read();
      console.log(orders);
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };

  postOrder: ExpressRouterHandler<Order> = async (req, res, next) => {
    try {
      const { body } = req;
      // @ts-ignore
      const updatedOrders = await this.orders.update(body, Object.keys(body));
      res.status(200).send(updatedOrders);
    } catch (err) {
      next(err);
    }
  };
})();
