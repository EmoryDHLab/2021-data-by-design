import express from "express";
import livedoc from "./livedoc";
const app = express();

app.get("/test", function (req, res) {
  const html = "<p>test</p>"
  res.send(html);
});

app.use("/livedoc", livedoc);

export default app;
