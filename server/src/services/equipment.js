import { Equipment } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";

//define function to  register Equipment
const registerEquipment = async (eqData) => {
  const equipment = await Equipment.create(eqData);
  if (!equipment) {
    throw new CustomError(400, "unable to register equipment");
  }
};
