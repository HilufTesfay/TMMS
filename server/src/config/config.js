import { config } from "dotenv";
import { envSchema } from "../validations/index";

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
};
