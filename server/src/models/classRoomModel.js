import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
const classRoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: [true, "Room number is required"],
    },
    blockNumber: {
      type: Number,
      ref: "Building",
      required: [true, "Building number is required"],
    },
    equipments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      },
    ],
    isTaken: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
//call plugins
classRoomSchema.plugin(format, "toJSON");
classRoomSchema.plugin(format, "toObject");

const ClassRoom = new mongoose.model("ClassRoom", classRoomSchema);
export default ClassRoom;
