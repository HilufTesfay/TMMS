import { ClassRoom } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import bldService from "./bldService.js";
//define function to check if class roo is already exist
const isRegistered = async (roomNumber) => {
  const room = await ClassRoom.findOne({ roomNumber: roomNumber });
  return !!room;
};
//define function to check if buliding where the class is found if exist
const isBuildingExist = async (blockNumber) => {
  const bullding = await bldService.getBuilding(blockNumber);
  return !!bullding;
};
// define function to create class
const addClassRoom = async (classRoomData) => {
  const { blockNumber } = classRoomData;
  if (!isBuildingExist) {
    throw new CustomError(400, `no block found with ${blockNumber}`);
  }
  const { roomNumber } = classRoomData;
  if (await isRegistered(roomNumber)) {
    throw new CustomError(400, `${roomNumber} is already exist`, true);
  }
  const classRoom = await ClassRoom.create(classRoomData);
  if (!classRoom) {
    throw new CustomError(400, "unable to create classrom", true);
  }
  return { message: `class room ${classRoom.roomNumber} added ` };
};
//define function to delete class room
const deleteClassRoom = async (roomNumber) => {
  const deletedClassRoom = await ClassRoom.deleteOne({
    roomNumber: roomNumber,
  });
  if (deletedClassRoom.deletedCount === 0) {
    throw new CustomError(400, "unable to delete building", true);
  }
  console.log(deletedClassRoom);
  return {
    message: `class room ${deleteClassRoom.roomNumber} deleted succcessfully`,
  };
};
//define function to get class romms

const getClassRoom = async (roomNumber) => {
  return await ClassRoom.findone({ roomNumber: roomNumber });
};
//define function that returns taken class rooms
const getTakenClassRooms = async () => {
  const takenClassRooms = await ClassRoom.find({ isTaken: true });
  if (Object.keys(takenClassRooms).length === 0) {
    throw new CustomError(200, "", true);
  }
  return { takenClassRooms: takenClassRooms };
};
//define function that returns available classrooms
const getAvailableClassRooms = async () => {
  const availableClassRooms = await ClassRoom.find({ isTaken: false });
  if (Object.keys(availableClassRooms).length === 0) {
    throw new CustomError(200, "", true);
  }
  return { availableClassRooms: availableClassRooms };
};
//define function to allocate class room
const allocateClassRoom = async (roomNumber) => {
  const room = await ClassRoom.findOne({ roomNumber: roomNumber });
  if (room.isTaken === true) {
    return { message: `${roomNumber} clas room has alreay taken` };
  }
  room.isTaken = true;
  const allocatedClassRoom = await room.save();
  return {
    message: `class room ${allocatedClassRoom.roomNumber}successfully allocated `,
  };
};
//define function to deallocate class rooms
const deallocateClassRoom = async (roomNumber) => {
  const room = await ClassRoom.findOne({ roomNumber: roomNumber });
  if (room.isTaken === false) {
    return { message: `${roomNumber} class room is available` };
  }
  room.isTaken = false;
  await room.save();
  return { message: `class room ${roomNumber} successfully deallocated` };
};
export default {
  addClassRoom,
  deleteClassRoom,
  getClassRoom,
  getAvailableClassRooms,
  getTakenClassRooms,
  allocateClassRoom,
  deallocateClassRoom,
};
