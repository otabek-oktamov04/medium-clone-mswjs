import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/handlers";
import { articleHandlers } from "./handlers/article-handlers";

export const worker = setupWorker(...handlers, ...articleHandlers);
