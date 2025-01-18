import { Booking } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
import classRoomService from "./classRoomService.js";
import bldService from "./bldService.js";

// book class room
const bookClassRoom = async (bookData) => {
  const { building } = bookData;
  const { room } = bookData;
  const classRoom = await classRoomService.getClassRoom(room);
  const block = await bldService.getBuilding(building);
  if (!classRoom || !room) {
    throw new CustomError(400, "This class room is not availabe", true);
  }
  const booking = await Booking.create(bookData);
  if (!booking) {
    throw new CustomError(400, "booking failed,please try again", true);
  }
  return booking;
};
//delete booking
const cancelBooking = async (id) => {
  const booking = await Booking.deleteOne({ id: id });
  if (booking.deletedCount === 0) {
    throw new CustomError(400, "unable to cancel booking", true);
  }
  return { message: "booking cancel successfully" };
};

export default cancelBooking;
