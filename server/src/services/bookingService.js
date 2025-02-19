import { Booking } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
import classRoomService from "./classRoomService.js";

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
  console.log(id);
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) {
    throw new CustomError(400, "unable to cancel booking", true);
  }
  const { message } = await classRoomService.deallocateClassRoom(
    booking.room,
    booking.building
  );
  console.log(message);
  return { message: "booking cancelled successfully" };
};
//get booking
const getBookings = async () => {
  return await Booking.find({});
};

export default { cancelBooking, createBooking, getBookings };
