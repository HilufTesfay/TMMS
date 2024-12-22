import { colleges } from "../config/department.js";
import mongoose from "mongoose";
//define function to
const validatePassword = (value, helpers) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(value)) {
    return helpers.message(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    );
  }
  return value;
};

const validatePhoneNumber = (value, helpers) => {
  const phoneRegex = /^(\+251|0)(9|7)(\d){8}$/; // Ethiopian phone number
  if (!phoneRegex.test(value)) {
    return helpers.message(
      "Phone number must be a valid Ethiopian phone number."
    );
  }
  return value;
};
const validateDepartment = (value, helpers) => {
  const college = helpers.state.ancestors[0].college;
  if (colleges[college] && colleges[college].departments.includes(value)) {
    return value;
  }
  return helpers.message("Department is not in the selected college.");
};
const validateObjectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid Id');
  }
  return value;
};

export {
  validatePassword,
  validatePhoneNumber,
  validateDepartment,
  validateObjectId,
};
