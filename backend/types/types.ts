import express from "express";

export type Order = {
  title: string;
  areaName: string;
  type: string;
  id: number;
  date: string;
  duration: number;
  units: number;
};

export type ExpressRouterHandler<ReqBody = any, ResBody = any> = (
  req: express.Request<ReqBody>,
  res: express.Response<ResBody>,
  next: express.NextFunction
) => Promise<void>;
