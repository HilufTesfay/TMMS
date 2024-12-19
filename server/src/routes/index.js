import userRoute from "./userRoute.js";
import express from "express";
const Router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRoute,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});
export default { Router };
