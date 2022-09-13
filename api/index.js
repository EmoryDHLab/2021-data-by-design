import express from "express";
import livedoc from "./livedoc";
import data from "./data";

const app = express();

app.use("/livedoc", livedoc);
app.use("/data", data);

export default app;
