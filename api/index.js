import express from "express";
import data from "./data";

const app = express();

app.use("/data", data);

export default app;
