import { ClassRoom } from "../models/index.js";
import { classRoomService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

// define middleware to add class room
const addClassRoom = handleCatchError(async (req, res) => {
  const { message } = await classRoomService.addClassRoom(req.body);
  res.status(200).json({
    message: message,
  });
});
//define  middleware to dele class romm
const deleteClassRoom = handleCatchError(async (req, res) => {
  const { roomNumber } = req.body;
  const { message } = await classRoomService.deleteClassRoom(roomNumber);
  res.status(202).json({
    message: message,
  });
});
export default { addClassRoom, deleteClassRoom };
