import Joi from "joi";
const envVars = Joi.object().keys({
  PORT: Joi.number().required().default(6000).description("port number"),
  DB_CONNECTION_URL: Joi.string()
    .required()
    .default("mongodb://localhost:27017/tmms"),
});
