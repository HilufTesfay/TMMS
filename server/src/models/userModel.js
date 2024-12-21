import mongoose from "mongoose";
import validator from "validator";
import { roles } from "../config/role.js";
import { employmentTypes } from "../config/employment.js";
import { colleges } from "../config/department.js";
import {
  hashPassword,
  format,
  isEmailUsed,
  isPhoneNumberUsed,
  verifyPassword,
  isUserIdUsed,
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
    college: {
      type: String,
      enum: Object.keys(colleges),
      required: [true, "college is required"],
    },
    department: {
      type: String,
      enum: [
        ...colleges.engineering.departments,
        ...colleges.science.departments,
        ...colleges.staff.departments,
      ],
      validate: {
        validator: function (value) {
          return colleges[this.college].department.includes(value);
        },
        message: "Department is not in the selected collage",
      },
      required: [true, "department is required"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (
          !value.match(/\d/) ||
          !value.match(/[a-z]/) ||
          !value.match(/[A-Z]/)
        ) {
          throw new Error(
            "Password must contain at least one capital letter,one small letter and one number"
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
userSchema.plugin(isUserIdUsed);

const User = mongoose.model("User", userSchema);
export { User };
