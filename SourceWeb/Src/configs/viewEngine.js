const express = require("express");
const path = require("path");

const configEngine = (app) => {
  // Config Engine
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  // Static File
  app.use(express.static(path.join(__dirname, "../public")));
  // Config Request Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = configEngine;
