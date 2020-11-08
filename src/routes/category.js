const express = require("express");
//HERE we are going to import the category schema

const { addCategory } = require("../controller/category");

const router = express.Router();
//
//
//           ****    C . A . T . E . G . O . R . Y   ****
//
//
// HERE YOU ARE GOING TO SPECIFY THE API
// /category/create
router.post("/category/create", addCategory);

module.exports = router;
