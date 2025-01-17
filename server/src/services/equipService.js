import { Equipment } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
import classRoomService from "./classRoomService.js";
//define function to  register Equipment
const registerEquipment = async (eqData) => {
  const { rooNumber } = eqData;
  const classRoom = await classRoomService.getClassRoom(rooNumber);
  if (!classRoom) {
    throw new CustomError(400, `class room ${rooNumber} not found`);
  }
  const equipment = await Equipment.create(eqData);
  if (!equipment) {
    throw new CustomError(400, "unable to register equipment", true);
  }
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
  const equipment = await Equipment.findOne({ id: id });
  if (!equipment) {
    throw new CustomError(400, `This equipment is mot foumd`, true);
  }
};
export default { updateEquipment, deleteEquipment, registerEquipment };
