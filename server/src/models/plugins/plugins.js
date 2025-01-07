import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/errorHandlers/customError.js";

//define plugin to hash password
function hashPassword(schema) {
  schema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
}
//define plugin to format the retrived data from databse
const format = (schema, option) => {
  let existingTransform = null;
  if (schema.options[option] && schema.options[option].transform) {
    existingTransform = schema.options[option].transform;
  }
  schema.set(option, {
    transform: (doc, ret) => {
      if (ret.password) {
        delete ret.password;
      }
      delete ret.createdAt;
      delete ret.updatedAt;
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      if (existingTransform) {
        return existingTransform(doc, ret);
      }
    },
  });
};
//define function to verify password
const verifyPassword = (schema) => {
  schema.methods.verifyPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(`password checking failed: ${error}`);
    }
  };
};
//define function to verify email
const verifyEmail = (schema) => {
  schema.methods.verifyEmail = function () {
    if (!this.email || typeof this.email === "object") {
      throw new CustomError(404, "email not found", true);
    }
    this.isEmailVerified = true;
    return this.isEmailVerified;
  };
};

//define function to unverify eamil
const unVerifyEmail = (schema) => {
  schema.methods.unVerifyEmail = function () {
    if (!this.email || typeof this.email === "object") {
      throw new CustomError(404, "email not found", true);
    }
    this.isEmailVerified = false;
    return this.isEmailVerified;
  };
  return { message: "successfully un verified" };
};
//define function to check if email is used
const isEmailUsed = (schema) => {
  schema.statics.isEmailUsed = async function (email) {
    try {
      return !!(await this.findOne({ email: email }));
    } catch (error) {
      throw new Error(`email checking failed: ${error}`);
    }
  };
};
//define function to check if phone number is used
const isPhoneNumberUsed = (schema) => {
  schema.statics.isPhoneNumberUsed = async function (phoneNumber) {
    try {
      return !!(await this.findOne({ phoneNumber: phoneNumber }));
    } catch (error) {
      throw new Error(`phone number checking failed: ${error}`);
    }
  };
};
//define function to check if user id is used
const isUserIdUsed = (schema) => {
  schema.statics.isUserIdUsed = async function (userId) {
    try {
      return !!(await this.findOne({ userId: userId }));
    } catch (error) {
      throw new Error(`user id checking failed:${error}`);
    }
  };
};
export {
  hashPassword,
  verifyPassword,
  format,
  isEmailUsed,
  isPhoneNumberUsed,
  isUserIdUsed,
  verifyEmail,
  unVerifyEmail,
};
