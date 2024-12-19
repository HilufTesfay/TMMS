import mongoose from "mongoose";
const classRoomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: [true, "Room number is required"],
  },
  blockNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlockNumber",
    required: [true, "block number is required"],
  },
  equipments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
  ],
});

const ClassRoom = new mongoose.model("ClassRoom", classRoomSchema);
export { ClassRoom };
