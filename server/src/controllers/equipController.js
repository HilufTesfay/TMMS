import Equipment from "../models/equipmentModel.js";
import { equipService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
//regegister equipment
const registerEquip = handleCatchError(async (req, res) => {
  const { message } = await equipService.registerEquipment(req.body);
  res.status(200).json(message);
});

//delete equipment
const deleteEquipment = handleCatchError(async (req, res) => {
  const { id } = req.body;
  const { message } = await equipService.deleteEquipment(id);
  res.status(200).json(message);
});

//update equioment
const updateEquipment = handleCatchError(async (req, res) => {
  const { id } = req.body;
  const { body } = req;
  const { message } = await equipService.updateEquipment(id, body);
  res.status(202).json(message);
});

export default { registerEquip, updateEquipment, deleteEquipment };
