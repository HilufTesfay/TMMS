import express from "express";
import userRouter from "./v1/userRoute.js";
import authRoute from "./v1/authRoute.js";
import bldRoute from "./v1/bldRoute.js";
import classRoomRoute from "./v1/classRoomRoute.js";
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
  {
    path: "/bld",
    route: bldRoute,
  },
  {
    path: "/class",
    route: classRoomRoute,
  },
];
routes.forEach((route) => {
  APIRouter.use(route.path, route.route);
});

export default APIRouter;
