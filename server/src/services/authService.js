import { CustomError } from "../utils/errorHandlers/customError.js";
import tokenService from "./tokenService.js";
import userService from "./userService.js";
//define function to register admin
const registerAdmin = async (reqBody) => {
  if (!reqBody) {
    throw new Error("request body is empty");
  }
  reqBody.role = "admin";
  const admin = await userService.createUser(reqBody);
  if (!admin) {
    throw new Error("admin donot registered");
  }
  return admin;
};
// define function to login user
const logIn = async (reqBody) => {
  const { email, passwrod } = reqBody;
  if (!email || !passwrod) {
    throw new Error("In correct email or password");
  }
  const user = await userService.getUserByEmail({ email: email });
  const isMatch = await user.verifyPassword(passwrod);
  if (!isMatch) {
    throw new CustomError("Invalid password");
  }
  return user;
};
export default { registerAdmin, logIn };
