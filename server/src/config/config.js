import { config } from "dotenv";
config({ path: "D:/projects/TMMS/server/.env" });

export const envVars = {
  port: process.env.PORT || 6000,
  dataBaseUrl: process.env.DB_CONNECTION_URL,
};
