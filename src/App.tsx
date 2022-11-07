import React from "react";
import "./App.css";
import { AddEntry } from "./pages/AddEntry";

console.log(process.env.NODE_ENV);

if (["development", "test"].includes(process.env.NODE_ENV)) {
  console.log("Worker is registered");
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return <AddEntry />;
}

export default App;
