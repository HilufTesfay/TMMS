import express from "express";
import userRouter from "./v1/userRoute.js";
import authRoute from "./v1/authRoute.js";
import bldRoute from "./v1/bldRoute.js";
import classRoomRoute from "./v1/classRoomRoute.js";
import equipRoute from "./v1/equipRoute.js";
import bookingRoute from "./v1/bookingRoute.js";
import analyticRoute from "./v1/anaRoute.js";
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
  {
    path: "/equip",
    route: equipRoute,
  },
  {
    path: "/booking",
    route: bookingRoute,
  },
  {
    path: "/analytics",
    route: analyticRoute,
  },
];

routes.forEach((route) => {
  APIRouter.use(route.path, route.route);
});

export default APIRouter;
