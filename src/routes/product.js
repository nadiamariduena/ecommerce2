const express = require("express");
//HERE we are going to import the product schema
// THE requireSignin and adminMiddleware is required for :
// the AUTHENTICATION purposes
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");
//

//
//    U S I N G **  M U L T E R
//
// _This will serve to link the destination FOLDER of the files_
const multer = require("multer");
// const upload , is the destination folder
// ({ dest: 'uploads/'}) , are the files
const upload = multer({ dest: "uploads/" });

const router = express.Router();
//
//
//
const { createProduct } = require("../controller/product");

//
//
//                        ****  P R O D U C T     ****
//                               routes
//
//
// change the ROUTE name for this , instead of category, add product
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.single("productPicture"),
  createProduct
);

module.exports = router;
