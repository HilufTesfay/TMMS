import { CustomError } from "../utils/errorHandlers/customError.js";
import tokenService from "./tokenService.js";
import userService from "./userService.js";
import emailService from "./emailService.js";
import { tokenTypes } from "../config/tokenTypes.js";
import { User } from "../models/index.js";

//define function to register admin
const registerAdmin = async (reqBody) => {
  reqBody.role = "admin";
  const admin = await userService.createUser(reqBody);
  const tokens = await tokenService.generateAuthToken(admin.id, admin.role);
  await verifyEmail(reqBody.email, admin);
  return { message: "Admin created successfully", tokens };
};

// define function to login user

const login = async (email, password) => {
  if (!email || !password) {
    throw new CustomError(400, "Invalid email or password", true);
  }
  const user = await userService.getUserByEmail(email);
  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    throw new CustomError(400, "Incorrect Email or password", true);
  }
  const tokens = await tokenService.generateAuthToken(user.id, user.role);
  return { message: "login successfully", tokens };
};

//define funcction to change password

const resetPassword = async (id, currentPassword, newPassword) => {
  if (!id || !currentPassword || !newPassword) {
    throw new CustomError(400, "CurrentPassord and new password are required");
  }
  const user = await userService.getUserById(id);
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
  return { message: "message has sent to your email,check your email" };
};

//define function to verify email

const verifyEmail = async (email, user) => {
  if (!email || !user) {
    throw new CustomError(400, "Email is required", true);
  }
  const verificationToken = await tokenService.generateEmailVerificationToken(
    user.id,
    user.role
  );
  await emailService.sendVerificationEmail(email, verificationToken);
  return {
    message: "verification email has sent to your email check your email",
  };
};

//define function to refresh token

const refreshToken = async (refreshToken, id) => {
  if (!refreshToken || !id) {
    throw new CustomError(400, "No refresh token found");
  }
  const user = await userService.getUserById({ id: id });
  const newTokens = await tokenService.refreshToken(refreshToken, user);
  return newTokens;
};

//define function logOut

const logout = async (id) => await tokenService.invalidateAllTokens(id);

//define function to activate acount

const VerifyAccount = async (token) => {
  if (!token) {
    throw new CustomError(400, "Token is required", true);
  }
  const tokenDoc = await tokenService.verifyToken(
    token,
    tokenTypes.VERIFICATION
  );
  if (!tokenDoc) {
    throw new CustomError(403, "email verification failed", true);
  }
  const id = tokenDoc.user;
  const isVerified = await userService.verifyUserEmail(id);
  return { message: "your email has verified", isVerified };
};

//define function to safely delete acount

const deleteAcount = async (id) => {
  const [res1, res2] = await Promise.all([
    userService.deleteUserById(id),
    tokenService.invalidateAllTokens(id),
  ]);
  return { message: `${res2.message} ${res1.message}` };
};

//define function to change email

const changeEmail = async (email, newEmail) => {
  if (User.isEmailUsed(newEmail)) {
    throw new CustomError(400, "This email is already used", true);
  }
  const user = await userService.getUserByEmail(email);
  user.email = newEmail;
  const savedUser = await user.save();
  if (!savedUser) {
    throw new CustomError(400, "email upadate failed", true);
  }
  await user.unVerifyEmail();
  await verifyEmail(email, user);
  return {
    message:
      "verification email has sent to your new email,check your eamil and verify your acount.",
  };
};

export default {
  registerAdmin,
  login,
  resetPassword,
  forgetPassword,
  refreshToken,
  logout,
  VerifyAccount,
  deleteAcount,
  changeEmail,
};
