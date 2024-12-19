import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
const conditions = ["good", "fair", "poor"];
const equipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    condition: {
      type: String,
      enum: conditions,
      default: conditions[0],
      required: [true, "condition of the equipment is required"],
    },
    roomNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
    },
  },
  { timestamps: true }
);
//call plugin
equipSchema.plugin(format, "toJSON");
equipSchema.plugin(format, "toObject");
const Equipment = new mongoose.model("Equipment", equipSchema);

export { Equipment };
