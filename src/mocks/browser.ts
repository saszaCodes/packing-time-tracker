import { setupWorker } from "msw";
import { handlersRespondingWithOK } from "./handlers";

// This configures a Service Worker with the given request handlers
const worker = setupWorker(...handlersRespondingWithOK);

worker.events.on("request:end", () => console.log("request:end"));
worker.events.on("request:match", () => console.log("request:match"));
worker.events.on("request:start", () => console.log("request:start"));
worker.events.on("request:unhandled", () => console.log("request:unhandled"));
worker.events.on("response:bypass", () => console.log("response:bypass"));
worker.events.on("response:mocked", () => console.log("response:mocked"));

export { worker };

// Expose methods globally to make them available in integration tests
// window.msw = { worker, rest };
