import { rest } from "msw";
import { ordersUrl } from "../utils/constants";

const getOrdersResponse = {
  orders: [
    {
      title: "test title",
      areaName: "test area name",
      type: "Test",
      id: "12345",
      date: "2022-10-10",
      duration: "541",
    },
    {
      title: "test title 2",
      areaName: "test area name",
      type: "Test",
      id: "12346",
      date: "2022-10-10",
      duration: "541",
    },
    {
      title: "test title 3",
      areaName: "test area name",
      type: "Test",
      id: "12347",
      date: "2022-10-10",
      duration: "541",
    },
  ],
};

export const handlersRespondingWithOK = [
  rest.get(ordersUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrdersResponse));
  }),
  rest.post(ordersUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrdersResponse));
  }),
];

export const handlersRespondingWithError = [
  rest.get(ordersUrl, (req, res, ctx) => {
    return res(ctx.status(500));
  }),
  rest.post(ordersUrl, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
