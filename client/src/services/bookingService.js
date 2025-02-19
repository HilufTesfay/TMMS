import axios from "axios";
const API_URL = "http://localhost:3000/v1/booking";
const getBookings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return error;
  }
};
// book
const bookRoom = async (room) => {
  const response = await axios.post(API_URL, { ...room });
  storeBooked(response.data);
  return response.data;
};
//get booking data
const getBookedRoom = () => {
  const booking = JSON.parse(localStorage.getItem("booking"));
  return booking;
};
const storeBooked = (room) => {
  localStorage.setItem("booking", JSON.stringify(room));
};
export default { getBookings, bookRoom, getBookedRoom, storeBooked };
