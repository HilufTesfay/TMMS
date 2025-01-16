import express from "express";
import { classRoomController } from "../../controllers/index.js";

const Router = express.Router();

Router.route("/")
  .post(classRoomController.addClassRoom)
  .delete(classRoomController.deleteClassRoom);

export default Router;
