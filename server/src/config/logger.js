import { format, transports, createLogger } from "winston";
import { envConfig } from "./config";
const { combine, timestamp, json, simple } = format;
const file = new transports.File({ filename: "logs/server.log" });
const console = new transports.Console({});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [file],
});
if (envConfig.env === "development") {
  logger.add(console);
}
