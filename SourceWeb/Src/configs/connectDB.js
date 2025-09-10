require("dotenv").config();
const mysql = require("mysql2/promise");

const connectionServer = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connectionServer;
