import { CustomError } from "../utils/errorHandlers/customError.js";
import tokenService from "./tokenService.js";
import userService from "./userService.js";
import emailService from "./emailService.js";
//define function to register admin
const registerAdmin = async (reqBody) => {
  if (!reqBody) {
    throw new Error("request body is empty");
  }
  reqBody.role = "admin";
  const admin = await userService.createUser(reqBody);
  const tokens = await tokenService.generateAuthToken(admin.id, admin.role);
  return { message: "Admin created successfully", tokens };
};
// define function to login user
const logIn = async (email, password) => {
  if (!email || !password) {
    throw new CustomError(400, "In valid email or password", true);
  }
  const user = await userService.getUserByEmail({ email: email });
  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    throw new CustomError(400, "Incorrect Email or password", true);
  }
  const tokens = await tokenService.generateAuthToken(user.id, user.role);
  return { message: "login successfully", tokens };
};
//define funcction to change password
const resetPassword = async (userId, currentPassword, newPassword) => {
  if (!userId || !currentPassword || !newPassword) {
    throw new CustomError(400, "CurrentPassord and new password are required");
  }
  const user = await userService.getUserById(userId);
  const isMatch = await user.verifyPassword(currentPassword);
  if (!isMatch) {
    throw new CustomError(400, "Incorrect Email or password", true);
  }
  user.password = newPassword;
  await user.save();
  return { message: "password reset successfully" };
};
//define function to handle forget password
const forgetPassword = async (email) => {
  if (!email) {
    throw new CustomError(400, "Email is required", true);
  }
  const user = await userService.getUserByEmail({ email: email });
  const token = tokenService.generateResetPasswordToken(user.id, user.role);
  emailService.sendResetPasswordEmail(email, token);
};
//define function to verify email
const verifyEmail = async (email, user) => {
  if (!email || user) {
    throw new CustomError(400, "Email is required", true);
  }
  const verificationToken = await tokenService.generateEmailVerificationToken(
    user.id,
    user.role
  );
  await emailService.sendVerificationEmail(email, verificationToken);
};
//define function to refresh token
const refreshToken = async (refreshToken, email) => {
  if (!refreshToken || !email) {
    throw new CustomError(400, "No refresh token found");
  }
  const user = await userService.getUserByEmail({ email: email });
  const newTokens = await tokenService.refreshToken(refreshToken, user);
  return newTokens;
};
//define function logOut
const logOut = () => {};
//define function to activate acount
const VerifyAcount = () => {};
//define function to safely delete acount
const deleteAcount = () => {};
//define function to change email
const changeEmail = () => {};
export default {
  registerAdmin,
  logIn,
  resetPassword,
  forgetPassword,
  refreshToken,
};
