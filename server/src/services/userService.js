import { User } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";

//define function to check request body
const checkBody = (reqBody) => {
  const { email, phoneNumber, userId } = reqBody;
  if (!email || !phoneNumber || !userId) {
    console.error("Validation error: Missing required fields");
    throw new CustomError(400, "Missing required fields", true);
  }
};
// define function to create user
const createUser = async (reqBody) => {
  const { email, phoneNumber, userId } = reqBody;
  checkBody(reqBody);
  try {
    const [isEmailUsed, isPhoneNumberUsed, isUserIdUsed] = await Promise.all([
      User.isEmailUsed(email),
      User.isPhoneNumberUsed(phoneNumber),
      User.isUserIdUsed(userId),
    ]);
    if (isEmailUsed) {
      console.error("Validation error: Email is already used");
      throw new CustomError(400, "Email is already used", true);
    }
    if (isPhoneNumberUsed) {
      console.error("Validation error: Phone number is already used");
      throw new CustomError(400, "Phone number is already used", true);
    }
    if (isUserIdUsed) {
      console.error("Validation error: User ID is already used");
      throw new CustomError(400, "User ID is already used", true);
    }
    const newUser = await User.create(reqBody);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export default { createUser };
