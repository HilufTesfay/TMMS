import { config } from "dotenv";
import { envSchema } from "../validations/index.js";

const envPath = "D:/projects/TMMS/server/.env";
config({ path: envPath });

const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
}
export const envConfig = {
  port: env.PORT || 6000,
  dataBaseUrl: env.DB_CONNECTION_URL,
  env: env.NODE_ENV,
  logPath: env.LOG_FILE_PATH,
  token: {
    secretKey: env.SECRET_KEY,
    acessTokenExp: env.ACESS_TOKEN_EXPIRES_IN_MINUTES,
    refreshTokenExp: env.REFRESH_TOKEN_EXPIRES_IN_DAYS,
    resetPasswordTokneExp: RESET_PASSWORD_TOKEN_EXPIRES_IN_MINUTES,
  },
};
