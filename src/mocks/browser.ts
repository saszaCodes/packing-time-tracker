import { setupWorker } from "msw";
import { handlersRespondingWithOK } from "./handlers";

// This configures a Service Worker with the given request handlers
export const worker = setupWorker(...handlersRespondingWithOK);

// Expose methods globally to make them available in integration tests
// window.msw = { worker, rest };
