import express from "express";
import { bookingController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/")
  .get(bookingController.getBookings)
  .post(bookingController.createBooking)
  .delete(bookingController.cancelBooking);
export default Router;
