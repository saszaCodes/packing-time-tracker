import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ordersRouter } from "./routes/orders";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("some res");
});
app.use(ordersRouter);

app.listen(port);
