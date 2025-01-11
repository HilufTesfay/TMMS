import express from "express";
import { authController } from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
const Router = express.Router();

Router.route("/register").post(authController.register);
Router.route("/login").post(authController.login);
Router.route("/logout").delete(authController.logout);
Router.route("/verify-email").post(authController.VerifyAccount);
Router.route("/change-email").post(authController.changeEmail);
Router.route("/change-password").post(authController.resetPassword);
Router.route("/refresh-token").post(authController.refreshToken);
Router.route("/forget-password").post(authController.forgetPassword);
Router.route("/delete-acount").delete(authController.deleteAcount);
export default Router;
