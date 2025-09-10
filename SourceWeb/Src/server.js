require("dotenv").config();
const express = require("express");

const app = express();
const webRouter = require("./router/mainRouter");
const configEngine = require("./configs/viewEngine");

const port = process.env.PORT_SV;
const hostname = process.env.HOST_SV;

configEngine(app);
app.use("/", webRouter);

app.listen(port, hostname, () => {
  console.log(`Server run on: http://${hostname}:${port}`);
});
