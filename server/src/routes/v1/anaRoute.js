import express from "express";
import { analyticController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/").get(analyticController.getAnalytics);

export default Router;
