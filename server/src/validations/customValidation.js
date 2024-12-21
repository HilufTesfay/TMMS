import { colleges } from "../config/department.js";
const validatePassword = (value, helper) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(value)) {
    return helper.message(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    );
  }
  return value;
};

const validatePhoneNumber = (value, helper) => {
  const phoneRegex = /^(\+251|0)(9|7)(\d){8}$/; // Ethiopian phone number
  if (!phoneRegex.test(value)) {
    return helper.message(
      "Phone number must be a valid Ethiopian phone number."
    );
  }
  return value;
};
const validateDepartment = (value, helper) => {
  const college = helper.state.ancestor[0].college;
  if (colleges[college] && colleges[college].departments.includes(value)) {
    return value;
  }
  return helper.message("Department is not in the selected college.");
};

export { validatePassword, validatePhoneNumber, validateDepartment };
