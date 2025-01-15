import express from "express";
import { authController } from "../../controllers/index.js";
import { validate, auth } from "../../middlewares/index.js";
import { authValidation, userValidation } from "../../validations/index.js";
const Router = express.Router();

Router.route("/register").post(
  auth.auhenticate,
  auth.ensure("manageUsers"),
  validate(userValidation.createUser),
  authController.register
);
Router.route("/login").post(
  validate(authValidation.login),
  authController.login
);
Router.route("/logout").delete(
  auth.auhenticate,
  validate(authValidation.id),
  authController.logout
);
Router.route("/verify-email").post(authController.VerifyAccount);
Router.route("/change-email").post(
  auth.auhenticate,
  auth.ensure("manageUsers"),
  validate(authValidation.changeEmail),
  authController.changeEmail
);
Router.route("/change-password").post(
  auth.auhenticate,
  auth.ensure("manageProfile"),
  validate(authValidation.resetPassword),
  authController.resetPassword
);
Router.route("/refresh-token").post(authController.refreshToken);
Router.route("/forgot-password").post(
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
Router.route("/set-password").post(authController.updatePassword);
Router.route("/delete-acount").delete(
  auth.auhenticate,
  auth.ensure("manageUsers"),
  validate(authValidation.id),
  authController.deleteAcount
);

export default Router;
