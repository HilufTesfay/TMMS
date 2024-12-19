import { User } from "../models/index.js";
import { CustomError } from "../utils/customError.js";
// define function to create user
const createUser = async (reqBody) => {
  const { email, phoneNumber } = reqBody;
  if (!email || !phoneNumber) {
    throw new CustomError(400, "email and phone number are required", true);
  }
  const [isEmailUsed, isPhoneNumberUsed] = await Promise.all([
    User.isEmailUsed(email),
    User.isPhoneNumberUsed(phoneNumber),
  ]);

  if (isEmailUsed) {
    throw new CustomError(400, "Email is already used", true);
  }

  if (isPhoneNumberUsed) {
    throw new CustomError(400, "phone number is already used", true);
  }
  return await User.create(reqBody);
};

export default { createUser };
