import express from "express";
import { bookingController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/")
  .post(bookingController.createBooking)
  .delete(bookingController.createBooking);
export default Router;
