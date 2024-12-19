import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
const blockSchema = new mongoose.Schema(
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
blockSchema.plugin(format, "toJSON");
blockSchema.plugin(format, "toObject");

const Block = new mongoose.model("BlockNumber", blockSchema);
export { Block };
