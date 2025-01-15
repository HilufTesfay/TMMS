import express from "express";
import { bldController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/")
  .post(bldController.addBuilding)
  .delete(bldController.deleteBuilding);
export default Router;
