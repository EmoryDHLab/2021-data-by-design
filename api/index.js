import express from "express";
import livedoc from "./livedoc";
import data from "./data";
const app = express();

app.get("/test", function (req, res) {
  const html = "<p>test</p>";
  res.send(html);
});

app.use("/livedoc", livedoc);
app.use("/data", data);

export default app;
