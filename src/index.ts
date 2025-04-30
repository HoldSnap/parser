import express from "express";
import swaggerUi, { type JsonObject } from "swagger-ui-express";
import yaml from "js-yaml";

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import parseRouter from "./routes/parseRouter.js";

const app = express();
const PORT = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

const spec = yaml.load(
  readFileSync(resolve(__dirname, "../openapi.yaml"), "utf8")
) as JsonObject;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use("/api", parseRouter);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}/api`);
  console.log(`Docs:   http://localhost:${PORT}/api-docs`);
});
