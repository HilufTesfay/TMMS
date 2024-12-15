import { httpLogger } from "./logger.js";
//define morgan format
const morganFormat =
  ":remote-user :remote-addr :method :url :status :http-version :response-time ms";
//define stream option to redirect morgan logs to Logger
const stream = {
  write: (data) => {
    const logData = {
      userName: data.split(" ")[0],
      ip: data.split(" ")[1],
      method: data.split(" ")[2],
      url: data.split(" ")[3],
      status: data.split(" ")[4],
      httpVersion: data.split(" ")[5],
      responseTime: data.split(" ")[6],
      Timestamp: data.split(" ")[7],
    };
    return httpLogger.info(JSON.stringify(logData));
  },
};
export { morganFormat, stream };
