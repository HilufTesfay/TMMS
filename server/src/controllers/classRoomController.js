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
  const classrooms = await classRoomService.getAvailableClassRooms();
  res.status(200).json(classrooms);
});

//get taken class
const getTakenClassRooms = handleCatchError(async (req, res) => {
  const rooms = await classRoomService.getTakenClassRooms();
  res.status(200).json(rooms);
});

//allocate class
const allocateClassRoom = handleCatchError(async (req, res) => {
  const { roomNumber, building } = req.body;
  console.log("controller", roomNumber, building);
  const { message } = await classRoomService.allocateClassRoom(
    roomNumber,
    building
  );
  res.status(200).json(message);
});

// deallocate class
const deallocateClassRoom = handleCatchError(async (req, res) => {
  const { roomNumber } = req.body;
  const { message } = await classRoomService.deallocateClassRoom(roomNumber);
  res.status(200).json(message);
});

//get class rooms
const getClassRooms = handleCatchError(async (req, res) => {
  const rooms = await classRoomService.getClassRooms();
  res.status(200).json(rooms);
});

export default {
  addClassRoom,
  deleteClassRoom,
  getAvailableClassRooms,
  getTakenClassRooms,
  deallocateClassRoom,
  allocateClassRoom,
  getClassRooms,
};
