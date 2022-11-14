import { AddEntry } from "./pages/AddEntry";
import { DisplayEntries } from "./pages/DisplayEntries/DisplayEntries";
import { QueryProvider } from "./queries/QueryProvider";
import styled from "styled-components";
import { Subtitle } from "./styledComponents/styledComponents";

// if (["development", "test"].includes(process.env.NODE_ENV)) {
//   console.log("Worker is registered");
//   const { worker } = require("./mocks/browser");
//   worker.start();
// }

const Container = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <QueryProvider>
      <Container>
        <Subtitle>Zamówienia</Subtitle>
        <DisplayEntries />
        <Subtitle>Dodaj nowe zamówienie</Subtitle>
        <AddEntry />
      </Container>
    </QueryProvider>
  );
}

export default App;
