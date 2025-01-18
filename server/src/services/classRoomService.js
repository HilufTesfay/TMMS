import { ClassRoom } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import bldService from "./bldService.js";
//define function to check if class roo is already exist
const isRegistered = async (body) => {
  const { roomNumber, blockNumber } = body;
  const room = await ClassRoom.findOne({
    roomNumber: roomNumber,
    blockNumber: blockNumber,
  });
  return !!room;
};
//define function to check if buliding where the class is found if exist
const isBuildingExist = async (blockNumber) => {
  const building = await bldService.getBuilding(blockNumber);
  console.log(building);
  return !!building;
};
// define function to create class
const addClassRoom = async (reqBody) => {
  const blockNumber = reqBody.blockNumber;
  if (!(await isBuildingExist(blockNumber))) {
    throw new CustomError(400, `no block found with ${blockNumber}`);
  }
  const { roomNumber } = reqBody;
  if (await isRegistered(reqBody)) {
    throw new CustomError(400, `${roomNumber} is already exist`, true);
  }
  const classRoom = await ClassRoom.create(reqBody);
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

  return {
    message: `class room ${deletedClassRoom.roomNumber} deleted succcessfully`,
  };
};
//define function to get class romms
const getClassRoom = async (roomNumber, blockNumber) => {
  return await ClassRoom.findOne({
    roomNumber: roomNumber,
    blockNumber: blockNumber,
  });
};
//define function that returns taken class rooms
const getTakenClassRooms = async () => {
  const takenClassRooms = await ClassRoom.find({ isTaken: true });
  return { takenClassRooms: takenClassRooms };
};
//define function that returns available classrooms
const getAvailableClassRooms = async () => {
  const availableClassRooms = await ClassRoom.find({ isTaken: false });
  return { availableClassRooms: availableClassRooms };
};
//define function to allocate class room
const allocateClassRoom = async (roomNumber, blockNumber) => {
  const room = await getClassRoom(roomNumber, blockNumber);

  if (room && room.isTaken === true) {
    return { message: `${roomNumber} clas room has alreay taken` };
  }
  room.isTaken = true;
  const allocatedClassRoom = await room.save();
  return {
    message: `class room ${allocatedClassRoom.roomNumber} successfully allocated `,
  };
};
//define function to deallocate class rooms
const deallocateClassRoom = async (roomNumber, blockNumber) => {
  const room = await getClassRoom(roomNumber, blockNumber);
  if (room.isTaken === false) {
    return { message: `${roomNumber} class room is available` };
  }
  room.isTaken = false;
  await room.save();
  return { message: `class room ${roomNumber} successfully deallocated` };
};
//get all class rooms
const getClassRooms = async () => {
  return await ClassRoom.find({});
};
export default {
  addClassRoom,
  deleteClassRoom,
  getClassRoom,
  getAvailableClassRooms,
  getTakenClassRooms,
  allocateClassRoom,
  deallocateClassRoom,
  getClassRooms,
};
