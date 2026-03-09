import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./lib/env";
import { routes } from "./routes";
import { notFound } from "./middleware/notfound.middleware";
import { errorHandler } from "./middleware/error.middleware";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);