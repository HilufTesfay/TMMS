import express from "express";
import userRouter from "./userRoute.js";
import authRoute from "./authRoute.js";
const APIRouter = express.Router();

const routes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];
routes.forEach((route) => {
  APIRouter.use(route.path, route.route);
});
export default APIRouter;
