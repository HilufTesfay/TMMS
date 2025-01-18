import { Equipment } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
import classRoomService from "./classRoomService.js";
//define function to  register Equipment
const registerEquipment = async (eqData) => {
  const { roomNumber } = eqData;
  const { blockNumber } = eqData;

  const classRoom = await classRoomService.getClassRoom(
    roomNumber,
    blockNumber
  );
  if (!classRoom) {
    throw new CustomError(400, `class room ${rooNumber} not found`);
  }
  const equipment = await Equipment.create(eqData);
  if (!equipment) {
    throw new CustomError(400, "unable to register equipment", true);
  }
  return { message: `${equipment.name} reqistred successfully` };
};
//define function to  delete Equipment
const deleteEquipment = async (id) => {
  const equipment = await Equipment.deleteOne({ id: id });
  if (equipment.deletedCount === 0) {
    throw new CustomError(400, "unable to delete equipment", true);
  }
  return { message: "deleted Successfully" };
};
//define function to update equipment
const updateEquipment = async (id, eqData) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    throw new CustomError(400, `This equipment is not found`, true);
  }
  delete eqData.id;
  Object.keys(eqData).forEach((data) => {
    equipment[data] = eqData[data];
  });
  await equipment.save();
  return { message: `${equipment.name} upadated successfully` };
};
//get equipments
const getEquipments = async () => {
  return await Equipment.find({});
};
export default {
  updateEquipment,
  deleteEquipment,
  registerEquipment,
  getEquipments,
};
