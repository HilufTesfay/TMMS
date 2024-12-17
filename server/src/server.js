import { app } from "./app.js";
import { envConfig } from "./config/config.js";
import { errorLogger } from "./config/logger.js";

const server = app.listen(envConfig.port, () => {
  console.log(`server is listenning at port :${envConfig.port}`);
});
// define errror handler for uncaught errors
const handleUncaughtError = (error) => {
  if (envConfig.env === "development") {
    console.log(error);
  }
  errorLogger.error(error);
  console.log("server is shuting down");
  handleExit(server);
};
//define function to exit the process gracefully
const handleExit = (server) => {
  if (server) {
    server.close(() => {
      console.log("server is shuting down");
      process.exit(0);
    });
  } else {
    process.exit(1);
  }
};
// node process listenning for possible uncuaght errors or for signal
process.on("uncaughtException", handleUncaughtError);
process.on("unhandledRejection", handleUncaughtError);
process.on("SIGTERM", (sig) => {
  errorLogger.error(sig);
  if (server) {
    server.close();
  }
});
