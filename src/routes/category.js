const express = require("express");
//HERE we are going to import the category schema
const { addCategory, getCategories } = require("../controller/category");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");
const router = express.Router();
//
//
//           ****    C . A . T . E . G . O . R . Y   ****
//
//
//
// /category/create
router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategory", getCategories);

module.exports = router;
