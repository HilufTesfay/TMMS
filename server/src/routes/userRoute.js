import express from "express";
import { validate } from "../middlewares/validation.js";
import { userValidation } from "../validations/index.js";
import { userController } from "../controllers/index.js";
const userRouter = express.Router();
userRouter
  .route("/")
  .post(validate(userValidation.createUser), userController.createUser);
userRouter.route("/update").post(userController.updateUser);
export default userRouter;
