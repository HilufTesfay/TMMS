import Joi from "joi";
const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().required().default(6000).description("port number"),
    DB_CONNECTION_URL: Joi.string()
      .required()
      .default("mongodb://localhost:27017/tmms")
      .description("mongodb url"),
    NODE_ENV: Joi.string().default("development").required(),
  })
  .unknown();
export { envSchema };
