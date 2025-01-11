import mongoose from "mongoose";
import { format } from "./plugins/plugins.js";
import { tokenTypes } from "../config/tokenTypes.js";
const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(tokenTypes),
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
tokenSchema.plugin(format, "toJSON");
tokenSchema.plugin(format, "toObject");
const Token = mongoose.model("Token", tokenSchema);
export default Token;
