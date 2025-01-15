import { Building } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";

//define function to check if buliding is already registered
const isRegistered = async (blockNUmber) => {
  const bulding = await Building.findOne({ blockNUmber: blockNUmber });
  return !!bulding;
};

//function to add bulding
const addBuilding = async (bldgData) => {
  if (isRegistered(bldgData.blockNUmber)) {
    throw new CustomError(400, "This building is already exist", true);
  }
  const newBuliding = await Building.create(bldgData);
  if (!newBuliding) {
    throw new CustomError(400, "bulding not added", true);
  }
  return { message: `${newBuliding.blockNUmber} building has added` };
};

// define function to delete buliding
const deleteBuilding = async (blockNUmber) => {
  const deletedBuliding = Building.deleteOne({ blockNUmber: blockNUmber });
  if (deleteBuilding.deletedCount == 0) {
    throw new CustomError(400, "unable to delete bulding", true);
  }
  return { message: `${blockNUmber} building removed successfully` };
};
// define function to update the building

export default { addBuilding, deleteBuilding };
