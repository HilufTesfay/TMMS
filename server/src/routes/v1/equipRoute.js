import express from "express";
import { equipController } from "../../controllers/index.js";
const Router = express.Router();
Router.route("/")
  .post(equipController.registerEquip)
  .delete(equipController.deleteEquipment)
  .put(equipController.updateEquipment)
  .get(equipController.getEquipments);

export default Router;
