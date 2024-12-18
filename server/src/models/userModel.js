import mongoose from "mongoose";
import { roles } from "../config/role.js";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      validate: {
        validator: (vaue) => validator.isEmail(vaue),
        message: "Your email is not valid Email",
      },
      unique: [true, "Email is already in use"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required"],
      unique: [true, "Phone number is already in use."],
    },
    employmentType: {
      type: String,
      required: [true, "employment type is required"],
      enum: ["fullTime", "contract", "partTime"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    roles: {
      type: String,
      required: [true, "User role is required"],
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    additionalInfo: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);
const User = new mongoose.model("User", userSchema);
export { User };
