import { classRoomService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

// define middleware to add class room
const addClassRoom = handleCatchError(async (req, res) => {
  const { message } = await classRoomService.addClassRoom(req.body);
  res.status(200).json({
    message: message,
  });
});

//define  middleware to delete class romm
const deleteClassRoom = handleCatchError(async (req, res) => {
  const { roomNumber } = req.body;
  const { message } = await classRoomService.deleteClassRoom(roomNumber);
  res.status(202).json({
    message: message,
  });
});

//get available class
const getAvailableClassRooms = handleCatchError(async (req, res) => {
  const classroms = await classRoomService.getAvailableClassRooms();
  res.status(200).json(classroms);
});

//get taken class
const getTakenClassRooms = handleCatchError(async () => {
  const rooms = await classRoomService.getTakenClassRooms();
  res.status(200).json(classroms);
});

//allocate class
const allocateClassRoom = handleCatchError(async (req, res) => {
  const { roomNumber } = req.body;
  const { message } = await classRoomService.allocateClassRoom(roomNumber);
  res.status(200).json(message);
});

// deallocate class
const deallocateClassRoom = handleCatchError(async (req, res) => {
  const { roomNumber } = req.body;
  const { message } = await classRoomService.deallocateClassRoom(roomNumber);
  res.status(200).json(message);
});

export default {
  addClassRoom,
  deleteClassRoom,
  getAvailableClassRooms,
  getTakenClassRooms,
  deallocateClassRoom,
  allocateClassRoom,
};
