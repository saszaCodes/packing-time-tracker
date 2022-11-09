import { setupWorker } from "msw";
import { handlersRespondingWithOK } from "./handlers";

const worker = setupWorker(...handlersRespondingWithOK);

export { worker };
