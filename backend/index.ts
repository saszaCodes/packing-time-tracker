import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("some res");
});

app.listen(port);
