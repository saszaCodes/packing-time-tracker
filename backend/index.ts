import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ordersRouter } from "./routes/orders";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ordersRouter);

app.listen(port);
