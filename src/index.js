const express = require("express");
const { ServerConfig, Logger } = require("./config/index");

//Local Imports
const apiRoutes = require('./routes/index');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running https//localhost:${ServerConfig.PORT}`);
  Logger.info("Sucessful running", "root", {});
});
