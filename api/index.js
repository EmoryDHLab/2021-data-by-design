import express from "express";
const app = express();

app.get("/test", function (req, res) {
  console.log("endpoint hit");
  res.send("<b>Hi</b>")
});

export default app;

