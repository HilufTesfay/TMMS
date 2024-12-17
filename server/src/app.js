import express from "express";
import { morganFormat, stream } from "./config/morgan.js";
import { CustomError } from "./utils/customError.js";
import { convertError, handleGlobalError } from "./middlewares/index.js";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan(morganFormat, { stream }));

app.use("/home", (req, res) => {
  res.send(" well come home");
});
app.all("*", (req, res, next) => {
  const message = `${req.originalUrl} not found`;
  const statusCode = 404;
  const error = new CustomError(statusCode, message, false);
  next(error);
});
//call global error converter
app.use(convertError);
//call global error handler
app.use(handleGlobalError);

export { app };
