import express from "express";
import { userController } from "../controllers/index.js";
const Router = express.Router();
Router.route("/").post(userController.createUser);

export default { Router };
