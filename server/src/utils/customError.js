class CustomError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "failed" : "error";
    // this.name = this.constractor.name;
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = isOperational;
  }
}
export { CustomError };
