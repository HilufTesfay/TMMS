import { bldService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

//define middleware to add buliding
const addBuilding = handleCatchError(async (req, res) => {
  const { message } = await bldService.addBuilding(req.body);
  res.status(200).json({
    messsage: message,
  });
});

// define middleware to delete building
const deleteBuilding = handleCatchError(async (req, res) => {
  const { blockNumber } = req.body;
  const { message } = await bldService.deleteBuilding(blockNumber);
  res.status(202).json({ message: message });
});

export default { addBuilding, deleteBuilding };
