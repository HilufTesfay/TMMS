import express from "express";
import { classRoomController } from "../../controllers/index.js";

const Router = express.Router();

Router.route("/")
  .post(classRoomController.addClassRoom)
  .delete(classRoomController.deleteClassRoom);
Router.route("/available").get(classRoomController.getAvailableClassRooms);
Router.route("/taken").get(classRoomController.getTakenClassRooms);

export default Router;
