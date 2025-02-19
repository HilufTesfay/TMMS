import { User, Equipment, Booking, ClassRoom } from "../models/index.js";
const getTotalUsers = async () => {
  const totalUsers = await User.countDocuments();
  return totalUsers;
};
const getTotalEquipments = async () => {
  const totalEquipments = await Equipment.countDocuments();
  return totalEquipments;
};
const getTotalBookings = async () => {
  const totalBookings = await Booking.countDocuments();
  return totalBookings;
};
const getTotalClassRooms = async () => {
  const totalClassRooms = await ClassRoom.countDocuments();
  return totalClassRooms;
};
const getAnalytics = async () => {
  const totalUsers = await getTotalUsers();
  const totalEquipments = await getTotalEquipments();
  const totalBookings = await getTotalBookings();
  const totalClassRooms = await getTotalClassRooms();
  return { totalUsers, totalEquipments, totalBookings, totalClassRooms };
};

export default { getAnalytics };
