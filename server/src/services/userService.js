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
  const { email, phoneNumber, id } = reqBody;
  checkBody(reqBody);
  const [isEmailUsed, isPhoneNumberUsed, isUserIdUsed] = await Promise.all([
    User.isEmailUsed(email),
    User.isPhoneNumberUsed(phoneNumber),
    User.isUserIdUsed(id),
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
};
//define function to get user by email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError(400, "No user found with this Email", true);
  }
  return user;
};
//define function to get user by id
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError(400, "No user found with this Id", true);
  }
  return user;
};
//define function to filterd data  to be upadated
const filterReqBody = (body) => {
  const protectedData = new Set([
    "role",
    "password",
    "email",
    "employeeType",
    "phoneNumber",
    "userId",
  ]);
  const filteredData = {};
  Object.keys(body).forEach((key) => {
    if (!protectedData.has(key)) {
      filteredData[key] = body[key];
    }
  });
  if (Object.keys(filteredData).length === 0) {
    throw new CustomError(404, "No data is provided to be updated", true);
  }
  return filteredData;
};
//define function to update user data
const updateUser = async (id, updateData) => {
  if (!updateData) {
    throw new CustomError(400, "No data is provided", true);
  }
  const filteredData = filterReqBody(updateData);
  const user = await getUserById(id);
  Object.keys(filteredData).forEach((key) => {
    user[key] = filteredData[key];
  });
  const updatedUser = await user.save();
  return { message: "User updated successfully", user: updateData };
};
//definfe function to verify user email
const verifyUserEmail = async (id) => {
  const user = await getUserById(id);
  return await user.verifyEmail();
};
//define function to delete user by id
const deleteUserById = async (id) => {
  const deletedUser = await User.deleteOne({ id: id });
  if (deletedUser.deletedCount === 0) {
    throw new CustomError(404, "No user found with this Id", true);
  }
  return { message: "User deleted successfully" };
};
//deind=e functon to gwt all users
const getUsers = async () => {
  const users = await User.find({});
  return { users: users };
};
export default {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUserEmail,
  updateUser,
  deleteUserById,
  getUsers,
};
