import { User } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";

//define function to check request body
const checkBody = (reqBody) => {
  const { email, phoneNumber, userId } = reqBody;
  if (!email || !phoneNumber || !userId) {
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
      throw new CustomError(400, "Email is already used", true);
    }
    if (isPhoneNumberUsed) {
      throw new CustomError(400, "Phone number is already used", true);
    }
    if (isUserIdUsed) {
      throw new CustomError(400, "User ID is already used", true);
    }
    const newUser = await User.create(reqBody);
    return newUser;
  } catch (error) {
    throw error;
  }
};
//define function to get user by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError(400, "No user found with this Email", true);
  }
  return user;
};
const getUserById = async (id) => {
  const user = await User.findOne({ id: id });
  if (!user) {
    throw new CustomError(400, "No user found with this Id", true);
  }
};
const updateUser = (updateData) => {
  if (!updateData) {
  }
};

export default { createUser, getUserByEmail, getUserById };
