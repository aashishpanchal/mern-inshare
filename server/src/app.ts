import cors from "cors";
import express from "express";
import { db } from "./database/prisma";
import { apiRouter } from "./apis/router";
import { NotFound } from "./utils/errors";
// middlewares packages
import { serveStaticFile } from "./utils/serve-file";
import { zodMiddleware } from "./middlewares/zod.middleware";
import { errorLogMiddleware } from "./middlewares/error-logs.middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
// types
import type { Application } from "express";

export async function App() {
  // connect database
  await db.$connect();
  // express application
  const app: Application = express();
  // serve react build file
  serveStaticFile(app, { exclude: ["/api/(.*)"] });
  // Middlewares
  app.use(cors());
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  // Api router
  app.use("/api", apiRouter);
  // Not found
  app.all("*", (req) => {
    throw new NotFound(`Cannot ${req.method} ${req.originalUrl}`);
  });
  // Error middlewares
  app.use(zodMiddleware);
  app.use(errorLogMiddleware);
  app.use(errorHandlerMiddleware);
  // return app
  return app;
}
