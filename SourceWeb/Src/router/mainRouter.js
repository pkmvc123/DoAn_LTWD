const express = require("express");
const router = express.Router();

const {
  //* Get
  indexPage,
  //* Get Data
  getListFood,
  //* POST
  postListFood,
} = require("../controllers/mainController");

router.get("/", indexPage);

router.get("/api/get-list-food", getListFood);

router.post("/api/post-orders-food", postListFood);

module.exports = router;
