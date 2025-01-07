import Joi from "joi";
import { CustomError, pick } from "../utils/index.js";
//define validate middleware to valiadte user request against schema
const validate = (Schema) => (req, res, next) => {
  const validSchema = Joi.compile(pick(Schema, ["body", "query", "params"]));
  const validRequest = pick(req, Object.keys(validSchema));
  const options = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  };
  const { value, error } = validSchema
    .prefs({ errors: { label: "key" } })
    .validate(validRequest, options);
  if (error) {
    const message = error.details.map((err) => err.message).join(",");
    return next(new CustomError(400, message, true));
  }
  Object.assign(req, value);
  return next();
};
export { validate };
