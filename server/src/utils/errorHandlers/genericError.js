import { CustomError } from "./customError.js";
const genericErrorHandlers = {
  SyntaxError: () => new CustomError(400, "Invalid syntax .", false),
  TypeError: () => new CustomError(500, "Type error:", false),
  ReferenceError: () => new CustomError(500, "Reference error:", false),
  RangeError: () => new CustomError(500, "Range error", false),
};
export default genericErrorHandlers;
