import { DateTime } from "luxon";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";
import { Token } from "../models/index.js";
import { CustomError } from "../utils/errorHandlers/customError.js";
import { tokenTypes } from "../config/tokenTypes.js";

const { sign, verify } = jwt;
// define funcrion to Generate a token
const generateToken = (userId, userRole, tokenType, expires) => {
  const payload = {
    sub: userId,
    role: userRole,
    type: tokenType,
    iat: DateTime.now().toUnixInteger(),
    exp: expires.toUnixInteger(),
  };
  return sign(payload, envConfig.token.secretKey);
};

// define funcrion to Save token to a data base
const saveToken = async (token, userId, type, expires, blacklisted = false) => {
  const tokenDoc = {
    token: token,
    user: userId,
    tokenType: type,
    expires: expires.toISO(),
    blacklisted: blacklisted,
  };
  const savedToken = await Token.create(tokenDoc);
  return savedToken;
};
//define function to delete token
const deleteToken = async (token, userId, type) => {
  const tokenDoc = await Token.deleteOne({
    token: token,
    user: userId,
    type: type,
  });
  if (tokenDoc.deletedCount === 0) {
    throw new CustomError(400, "Token not found or already deleted", true);
  }
  return { message: "Deleted successfully" };
};
// define funcrion to Verify a token
const verifyToken = async (token, tokenType) => {
  const payload = verify(token, envConfig.token.secretKey);
  const tokenDoc = await Token.findOne({
    token: token,
    user: payload.sub,
    tokenType: tokenType,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new CustomError(400, "Token verification failed", true);
  }
  return tokenDoc;
};

// define funcrion to genenrate accessToken
const generateAccessToken = (userId, userRole) => {
  const tokenType = tokenTypes.ACCESS;
  const expires = DateTime.now().plus({
    minutes: envConfig.token.acessTokenExp,
  });
  const accessToken = generateToken(userId, userRole, tokenType, expires);
  return accessToken;
};
//define function to generate reset token
const generateResetPasswordToken = async (userId, userRole) => {
  const tokenType = tokenTypes.RESET;
  const expires = DateTime.now().plus({
    minutes: envConfig.token.resetPasswordToknExp,
  });
  const resetToken = generateToken(userId, userRole, tokenType, expires);
  await saveToken(resetToken, userId, tokenType, expires, false);
  return resetToken;
};
//define funcrion to generate refreshtoken
const generateRefreshToken = async (userId, userRole) => {
  const tokenType = tokenTypes.REFRESH;
  const expires = DateTime.now().plus({ day: envConfig.token.refreshTokenExp });
  const refreshToken = generateToken(userId, userRole, tokenType, expires);
  await saveToken(refreshToken, userId, tokenType, expires, false);
  return refreshToken;
};
//define function to genrate emailVerification Token
const generateEmailVerificationToken = async (userId, userRole) => {
  const tokenType = tokenTypes.VERIFICATION;
  const expires = DateTime.now().plus({
    seconds: envConfig.token.emailVerificationTokenEXp,
  });
  const verificationToken = generateToken(userId, userRole, tokenType, expires);
  await saveToken(verificationToken, userId, tokenType, expires);
  return verificationToken;
};
//define funcrion to generate auth tokens
const generateAuthToken = async (userId, userRole) => {
  const accesToken = generateAccessToken(userId, userRole);
  const refreshToken = await generateRefreshToken(userId, userRole);
  return { accesToken, refreshToken };
};

// define function to redresh token
const refreshToken = async (token, user) => {
  const tokenType = tokenTypes.REFRESH;
  const tokenDoc = await verifyToken(token, tokenType);
  await deleteToken(token, tokenDoc.user, tokenType);
  const newTokens = generateAuthToken(user.id, user.role);
  return newTokens;
};
//define funcrion to check the authenticty of token
const isAuthenticatedToken = (token) => {
  const result = {
    isValidToken: false,
  };
  const payload = verify(token, envConfig.token.secretKey);

  if (!payload) {
    return result;
  }
  result.isValidToken = true;
  result.userId = payload.sub;
  result.userRole = payload.userRole;
  return result;
};

export default {
  refreshToken,
  generateResetPasswordToken,
  generateEmailVerificationToken,
  generateAuthToken,
  isAuthenticatedToken,
};
