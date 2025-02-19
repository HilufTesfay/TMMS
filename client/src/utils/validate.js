import validator from "validator";
const validateFormData = (formData) => {
  const errors = {};

  // Validate required fields
  const requiredFields = [
    "userId",
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "employmentType",
    "college",
    "department",
    "password",
  ];
  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    }
  });
  // Validate email format
  if (formData.email && !validator.isEmail(formData.email)) {
    errors.email = "Invalid email format";
  }
  // Validate password
  if (formData.password) {
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (
      !formData.password.match(/\d/) ||
      !formData.password.match(/[a-z]/) ||
      !formData.password.match(/[A-Z]/)
    ) {
      errors.password =
        "Password must contain at least one capital letter, one small letter, and one number";
    }
  }
  return errors;
};
export default validateFormData;
