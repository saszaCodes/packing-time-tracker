import { rest } from "msw";
import { ServerResponsePayloads } from "../types/DTOs";
import { ordersUrl } from "../utils/constants";

export const getOrdersResponse: ServerResponsePayloads["/orders"]["get"] = [
  {
    title: "test title",
    areaName: "test area name",
    type: "Test",
    id: 12345,
    date: "2022-10-10",
    duration: 541,
    units: 12,
  },
  {
    title: "test title 2",
    areaName: "test area name",
    type: "Test",
    id: 12346,
    date: "2022-10-10",
    duration: 17,
    units: 200,
  },
  {
    title: "test title 3",
    areaName: "test area name",
    type: "Test",
    id: 12347,
    date: "2024-10-10",
    duration: 1000,
    units: 381,
  },
  {
    title: "test title 4",
    areaName: "test area name",
    type: "Test",
    id: 12347,
    date: "2021-10-10",
    duration: 323,
    units: 36772,
  },
  {
    title: "test title 5",
    areaName: "test area name",
    type: "Test",
    id: 12347,
    date: "2021-10-10",
    duration: 8931,
    units: 721,
  },
];

export const handlersRespondingWithOK = [
  rest.get(ordersUrl, async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.body(JSON.stringify(getOrdersResponse))
    );
  }),
  rest.post(ordersUrl, async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.body(JSON.stringify(getOrdersResponse))
    );
  }),
];

export const handlersRespondingWithError = [
  rest.get(ordersUrl, async (req, res, ctx) => {
    return await res(ctx.status(500));
  }),
  rest.post(ordersUrl, async (req, res, ctx) => {
    return await res(ctx.status(200));
  }),
];
