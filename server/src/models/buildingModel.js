import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
const buildingSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    classRooms: [
      {
        type: Number,
        ref: "ClassRoom",
      },
    ],
  },
  { timestamps: true }
);
//calling plugins
buildingSchema.plugin(format, "toJSON");
buildingSchema.plugin(format, "toObject");

const Block = new mongoose.model("BlockNumber", buildingSchema);
export { Block };
