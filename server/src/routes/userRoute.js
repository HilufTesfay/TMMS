import express from "express";
import { userController } from "../controllers/index.js";
const userRouter = express.Router();
userRouter.route("/").post(userController.createUser);

export { userRouter };
