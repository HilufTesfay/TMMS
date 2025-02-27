import { authService, tokenService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

//define register middleware
const register = handleCatchError(async (req, res) => {
  const { message, tokens } = await authService.registerAdmin(req.body);
  res.status(201).json({
    message: message,
    tokens: tokens,
  });
});

//define login middleware
const login = handleCatchError(async (req, res) => {
  const { email, password } = req.body;
  const { message, tokens, role, name, userId } = await authService.login(
    email,
    password
  );
  res.status(200).json({
    message: message,
    tokens: tokens,
    role: role,
    name: name,
    userId: userId,
  });
});

//define logOut middleware
const logout = handleCatchError(async (req, res) => {
  const { id } = req.body;
  await authService.logout(id);
  res.status(202).json({ message: "logout successfully" });
});

//define middleware to reset password
const resetPassword = handleCatchError(async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  const { message } = await authService.resetPassword(
    id,
    currentPassword,
    newPassword
  );
  res.status(200).json({
    message: message,
  });
});

//define middleware forgetpassword
const forgotPassword = handleCatchError(async (req, res) => {
  const { email } = req.body;
  const { message } = await authService.forgetPassword(email);
  res.status(200).send(message);
});
//define middleware refersh token
const refreshToken = handleCatchError(async (req, res) => {
  const token = tokenService.extractToken(req.headers);
  const { id } = req.body;
  const newTokens = await authService.refreshToken(token, id);
  res.status(200).json({
    newTokens,
  });
});

//define middleware to verify acount
const VerifyAccount = handleCatchError(async (req, res) => {
  const { token } = req.body;
  const { message } = await authService.VerifyAccount(token);
  res.status(200).json({
    message: message,
  });
});

//middleware delete Acount
const deleteAcount = handleCatchError(async (req, res) => {
  const { id } = req.body;
  const { message } = await authService.deleteAcount(id);
  res.status(202).json({
    message: message,
  });
});
//define middledware changeEmail
const changeEmail = handleCatchError(async (req, res) => {
  const { email, newEmail } = req.body;
  const { message } = await authService.changeEmail(email, newEmail);
  res.status(200).json({
    message: message,
  });
});
//define middleware to verify password verification code
const updatePassword = handleCatchError(async (req, res) => {
  const { token, newPassword } = req.body;
  const message = await authService.updatePassword(token, newPassword);
  res.status(200).json({
    message: message,
  });
});
export default {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  refreshToken,
  VerifyAccount,
  deleteAcount,
  changeEmail,
  updatePassword,
};
