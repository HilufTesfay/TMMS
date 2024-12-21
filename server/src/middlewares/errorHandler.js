import httpStatus from "http-status";
import mongoose, { MongooseError } from "mongoose";
import { envConfig } from "../config/config.js";
import { CustomError } from "../utils/index.js";
import { errorLogger } from "../config/logger.js";
//define heleper function to handle error logging
const logError = (error) => {
  errorLogger.error("error details", {
    errorName: error.name,
    message: error.message,
    stack: error.stack,
  });
};
//define object of error handlers for mongoose error
const mongooseErrorHandlers = {
  //Handle ValidationError
  ValidationError: (error) => ({
    statusCode: 400,
    message: Object.values(error.errors)
      .map((e) => e.message)
      .join(", "),
  }),

  //Handle CastError
  CastError: (error) => ({
    statusCode: 400,
    message: `Invalid value for ${error.path}: ${error.value}`,
  }),

  //Handle MongoDB Server error
  MongoServerError: (error) => {
    if (error.code === 11000) {
      const fieldName = Object.keys(error.keyValue)[0];
      const fieldValue = error.keyValue[fieldName];
      return {
        statusCode: 409,
        message: `This ${fieldName} => ${fieldValue} is already exists. Please use other${fieldName} .`,
      };
    }
    return {
      statusCode: 500,
      message: "something went wrong. Please try again later.",
    };
  },

  // handler for  unknown errors
  unknownError: (error) => ({
    statusCode: 500,
    message: "Something went wrong, please try again later.",
  }),
};
// define object of authentication errors related to token-based authentication
const authenticationErrorHandlers = {
  UnauthorizedError: () =>
    new CustomError(401, "you are not authenticated", true),
  ForbiddenError: () =>
    new CustomError(403, " you don't have permision to acccess", true),
  JsonWebTokenError: () => new CustomError(401, "Invalid token", true),
  TokenExpiredError: () => new CustomError(401, "Token Expires", true),
};
//define object of generic error handlers
const genericErrorHandlers = {
  SyntaxError: () => new CustomError(400, "Invalid syntax .", false),
  TypeError: () => new CustomError(500, "Type error:", false),
  ReferenceError: () => new CustomError(500, "Reference error:", false),
  RangeError: () => new CustomError(500, "Range error", false),
};

//define global error converter
const convertError = (error, req, res, next) => {
  //check if error is custom error
  if (error instanceof CustomError) {
    return next(error);
  }
  //check if error is mongoose error
  if (error instanceof MongooseError) {
    const handleError =
      mongooseErrorHandlers[error.name] || mongooseErrorHandlers.unknownError;
    const { statusCode, message } = handleError(error);
    logError(error);
    return next(new CustomError(statusCode, message, true));
  }
  //check if the error is found in the authentication error
  if (error.name in authenticationErrorHandlers) {
    logError(error);
    return next(new authenticationErrorHandlers[error.name]());
  }
  //check if the error is found in the generic errors
  if (error.name in genericErrorHandlers) {
    logError(error);
    return next(genericErrorHandlers[error.name]());
  }
  //log for unknown errors
  logError(error);
  next(new CustomError(500, "something went wrong", true));
};
//define global error handler
const handleGlobalError = (error, req, res, next) => {
  logError(error);
  const response = {
    message:
      error.isOperational === false ? "something went wrong" : error.message,
    status: error.status,
  };
  res.status(error.statusCode).json(response);
};

export { handleGlobalError, convertError };
