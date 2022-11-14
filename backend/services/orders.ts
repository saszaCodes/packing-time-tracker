import { OrdersModel } from "../models/orders";
import { ExpressRouterHandler, Order } from "../types/types";

export const ordersService = new (class OrdersService {
  orders = new OrdersModel();

  getOrders: ExpressRouterHandler = async (req, res, next) => {
    try {
      const orders = await this.orders.read();
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };

  postOrder: ExpressRouterHandler<Order> = async (req, res, next) => {
    try {
      const { body } = req;
      const newOrder =
        Object.keys(body.file || {}).length === 0 ? body[0] : body.file;

      const parsedBody = {
        newOrder,
        id: undefined,
        orderId: body.id,
        file: undefined,
      };
      const createdOrder = await this.orders.create(parsedBody);
      res.status(200).send(createdOrder);
    } catch (err) {
      next(err);
    }
  };
})();
