class CustumError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 ? "failed" : "error";
    this.name = this.constractor.name;
    Error.captureStackTrace(this, this.constractor);
    this.isOPerational = true;
  }
}
export { CustumError };
