import { Building } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";

//define function to check if buliding is already registered
const isRegistered = async (blockNumber) => {
  const bulding = await Building.findOne({ blockNumber: blockNumber });
  console.log(bulding);
  return !!bulding;
};

//function to add bulding
const addBuilding = async (bldgData) => {
  const { blockNumber } = bldgData;
  if (await isRegistered(blockNumber)) {
    throw new CustomError(
      400,
      `building ${blockNumber} is already exist`,
      true
    );
  }
  const newBuliding = await Building.create(bldgData);
  if (!newBuliding) {
    throw new CustomError(400, "bulding not added", true);
  }
  return { message: `building ${newBuliding.blockNumber}  has added` };
};

// define function to delete buliding
const deleteBuilding = async (blockNumber) => {
  const deletedBuliding = await Building.deleteOne({
    blockNumber: blockNumber,
  });
  if (deleteBuilding.deletedCount === 0) {
    throw new CustomError(400, "unable to delete bulding", true);
  }
  return { message: `${blockNumber} building removed successfully` };
};
//define function to get building by blocknumber
const getBuilding = async (blockNumber) => {
  const building = await Building.findOne({ blockNumber: blockNumber });
  return building.blockNumber;
};
export default { addBuilding, deleteBuilding, getBuilding };
