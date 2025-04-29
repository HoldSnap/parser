import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (_req, res) => {
  res.send("Привет из TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
