require("dotenv").config();
const express = require("express");
const http = require("http");

const app = express();
const webRouter = require("./router/mainRouter");
const configEngine = require("./configs/viewEngine");
const { initWebSocket } = require("./middlewares/wsServer");

const server = http.createServer(app);
const port = process.env.PORT_SV;
const hostname = process.env.HOST_SV;

initWebSocket(server);
configEngine(app);
app.use("/", webRouter);

server.listen(port, hostname, () => {
  console.log(`Server run on: http://${hostname}:${port}`);
});
