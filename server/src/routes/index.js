import { userRouter } from "./userRoute.js";
import express from "express";
const APIRouter = express.Router();

const routes = [
  {
    path: "/user",
    route: userRouter,
  },
];
routes.forEach((route) => {
  APIRouter.use(route.path, route.route);
});
export { APIRouter };
