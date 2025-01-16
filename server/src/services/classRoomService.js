import { ClassRoom } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import { bldService } from "./index.js";
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
  return {
    message: `class room ${deleteClassRoom.roomNumber} deleted succcessfully`,
  };
};

export default { addClassRoom, deleteClassRoom };
