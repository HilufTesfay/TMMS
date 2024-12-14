import { app } from "./app.js";
import { envVars } from "./config/config.js";
app.listen(envVars.port, () => {
  console.log(`server is listenning at port :${envVars.port}`);
});
