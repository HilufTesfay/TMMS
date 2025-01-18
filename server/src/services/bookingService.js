import { Booking } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
import classRoomService from "./classRoomService.js";
import bldService from "./bldService.js";

// book class room
const createBooking = async (bookData) => {
  const { building } = bookData;
  const { room } = bookData;
  const { message } = await classRoomService.allocateClassRoom(room, building);
  console.log(message);
  const booking = await Booking.create(bookData);
  if (!booking) {
    throw new CustomError(400, "booking failed,please try again", true);
  }
  return booking;
};

//cancel booking
const cancelBooking = async (id) => {
  const booking = await Booking.deleteOne({ id: id });
  if (booking.deletedCount === 0) {
    throw new CustomError(400, "unable to cancel booking", true);
  }
  const { message } = await classRoomService.deallocateClassRoom(booking.room);
  console.log(message);
  return { message: "booking cancel successfully" };
};

export default { cancelBooking, createBooking };
