import Joi from "joi";
import {
  validatePassword,
  validatePhoneNumber,
  validateDepartment,
  validateObjectId,
} from "./customValidation.js";
import { colleges } from "../config/department.js";
const validColleges = Object.keys(colleges);
//validation schema for user
const createUser = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required().custom(validatePhoneNumber),
    employmentType: Joi.string()
      .required()
      .valid("full-time", "part-time", "contractor"),
    role: Joi.string().default("instructor"),
    college: Joi.string()
      .required()
      .valid(...validColleges),
    department: Joi.string().required().custom(validateDepartment),
    password: Joi.string()
      .min(8)
      .default("Password1234")
      .custom(validatePassword),
    additionalInfo: Joi.object().keys({}).optional(),
  }),
};
//defien getUserByEmail schema
const getUserByEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
//defien getUserById schema
const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
};
//define change user info schema
const changeUserInfo = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
  body: Joi.object().keys({
    userId: Joi.string(),
    email: Joi.string().email(),
    employmentType: Joi.string().valid("full-time", "part-time", "contractor"),
    college: Joi.string().valid(...validColleges),
    department: Joi.string().custom(validateDepartment),
  }),
};
//define updatet user schema
const updateProfile = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string().custom(validatePhoneNumber),
    additionalInfo: Joi.object().keys({}).optional(),
  }),
};
export default { createUser, changeUserInfo, updateProfile };
