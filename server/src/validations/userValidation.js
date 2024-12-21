import Joi from "joi";
import {
  validatePassword,
  validatePhoneNumber,
  validateDepartment,
} from "./customValidation.js";
import { colleges } from "../config/department.js";
const validColleges = Object.keys(colleges);
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
    role: Joi.string().required().default("user"),
    college: Joi.string()
      .required()
      .valid(...validColleges),
    department: Joi.string().required().custom(validateDepartment),
    password: Joi.string()
      .required()
      .min(8)
      .default("Password1234")
      .custom(validatePassword),
    additionalInfo: Joi.object().keys({}).optional(),
  }),
};
export default { createUser };
