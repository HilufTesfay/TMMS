import express from "express";
import { morganFormat, stream } from "./config/morgan.js";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan(morganFormat, { stream }));
app.use("/home", (req, res) => {
  res.send("home");
});
export { app };
