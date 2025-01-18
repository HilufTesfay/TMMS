import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
const bookingSchem = new mongoose.Schema(
  {
    instructor: {
      type: String,
      ref: "User",
      required: [true, "instractor id is required"],
    },
    room: {
      type: Number,
      ref: "ClassRoom",
      required: [true, "Class room is required"],
    },
  },
  { timestamps: true }
);
bookingSchem.plugin(format, "toJSON");
bookingSchem.plugin(format, "toObject");

const Booking = new mongoose.model("Booking", bookingSchem);
export default Booking;
