import { app } from "./app.js";
import { envConfig } from "./config/config.js";
app.listen(envConfig.port, () => {
  console.log(`server is listenning at port :${envConfig.port}`);
});
