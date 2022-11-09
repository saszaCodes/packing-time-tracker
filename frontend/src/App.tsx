import { AddEntry } from "./pages/AddEntry";
import { DisplayEntries } from "./pages/DisplayEntries/DisplayEntries";
import { QueryProvider } from "./queries/QueryProvider";

console.log(process.env.NODE_ENV);

if (["development", "test"].includes(process.env.NODE_ENV)) {
  console.log("Worker is registered");
  const { worker } = require("./mocks/browser");
  worker.start();
}
function App() {
  return (
    <QueryProvider>
      <DisplayEntries />
      <AddEntry />
    </QueryProvider>
  );
}

export default App;
