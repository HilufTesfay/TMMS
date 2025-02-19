import { bookingService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

//create booking
const createBooking = handleCatchError(async (req, res) => {
  const booking = await bookingService.createBooking(req.body);
  res.status(200).json(booking);
});

//delete booking
const cancelBooking = handleCatchError(async (req, res) => {
  const { message } = await bookingService.cancelBooking(req.body.id);
  res.status(202).json(message);
});
//get booking
const getBookings = handleCatchError(async (req, res) => {
  const bookings = await bookingService.getBookings();
  res.status(200).json(bookings);
});

export default { createBooking, cancelBooking, getBookings };
