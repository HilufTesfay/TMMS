import express from "express";
import { morganFormat, stream } from "./config/morgan.js";
import morgan from "morgan";
import cors from "cors";
import { CustomError } from "./utils/index.js";
import { errorHandler } from "./middlewares/index.js";
import APIRouter from "./routes/index.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(morganFormat, { stream })); //uncomment this line to enable logging

app.use("/home", (req, res) => {
  res.send(" well come home");
});
//use APIRouter for /v1 APIs
app.use("/v1", APIRouter);
//redirect here for not found API
app.all("*", (req, res, next) => {
  const message = `${req.originalUrl} not found`;
  const statusCode = 404;
  const error = new CustomError(statusCode, message, true);
  next(error);
});
//call global error converter
app.use(errorHandler.convertError);
//call global error handler
app.use(errorHandler.handleGlobalError);

export { app };
