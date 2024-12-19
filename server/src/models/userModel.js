import mongoose from "mongoose";
import validator from "validator";
import { roles } from "../config/role.js";
import { employmentTypes } from "../config/employment.js";
import {
  hashPassword,
  format,
  isEmailUsed,
  isPhoneNumberUsed,
  verifyPassword,
} from "./plugins/plugins.js";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: [true, "ID is required"],
    },
    profilePicture: {
      type: Buffer,
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Email is already in use"],
      required: [true, "Email is required"],
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Your email is not a valid email",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number is already in use."],
    },
    employmentType: {
      type: String,
      required: [true, "Employment type is required"],
      enum: employmentTypes,
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
    role: {
      type: String,
      required: [true, "User role is required"],
      enum: roles,
      default: "instructor",
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

// Add plugins
userSchema.plugin(hashPassword);
userSchema.plugin(verifyPassword);
userSchema.plugin(format, "toJSON");
userSchema.plugin(format, "toObject");
userSchema.plugin(isEmailUsed);
userSchema.plugin(isPhoneNumberUsed);

const User = mongoose.model("User", userSchema);
export { User };
