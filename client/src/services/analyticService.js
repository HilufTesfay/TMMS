import axios from "axios";
const serverUrl = "http://127.0.0.1:3000/v1/analytics";
const getAnalytics = async () => {
  try {
    const response = await axios.get(serverUrl);
    localStorage.setItem("bookings", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
//get booking
const getBooking = () => {
  return JSON.parse(localStorage.getItem("booking"));
};

export default { getAnalytics, getBooking };
