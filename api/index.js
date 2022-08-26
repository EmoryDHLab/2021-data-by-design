import express from "express";
import data from "./data";

const app = express();

app.get("/test", (req, res) => {
  const html = "<p>test</p>";
  res.send(html);
});

app.use("/data", data);

export default app;
