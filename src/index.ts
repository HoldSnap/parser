import express from "express";
import parseRouter from "./routes/parseRouter.js";

const app = express();
const PORT = 8080;

app.use("/api", parseRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
