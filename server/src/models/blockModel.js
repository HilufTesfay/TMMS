import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
const buildingSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: Number,
      required: true,
    },
    classRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassRoom",
      },
    ],
  },
  { timestamps: true }
);
//calling plugins
buildingSchema.plugin(format, "toJSON");
blockSchema.plugin(format, "toObject");

const Block = new mongoose.model("BlockNumber", buildingSchema);
export { Block };
