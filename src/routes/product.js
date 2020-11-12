const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");
//
const { createProduct } = require("../controller/product");

//
//    U S I N G **  M U L T E R
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
//

//
//
//

//
//
//                        ****  P R O D U C T     ****
//                               routes
//
//
//MULTER config -------- const storage = multer.diskStorage({
// multer.diskStorage
// Is where you want to store the data, its connected to:  const upload = multer({ storage });
//
// cb is the call back function, like the "done" in roberts example
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  /*
  
  filename
  will 
  
  */
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

// multer middleware **
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });
// the multer middleware related  upload.single("productPicture"),
// here you tell multer which name you are going to use for the image ("productPicture")
// if you have multiple images of 1 product, you use array.
// upload.array("product_images")
//

/*
 where does multer "upload" the FILE INFORMATION?
 for a single file:
 file: req.file,

- single image
upload.single("productPicture"),

- multiple images
upload.array("productPicture"),


*/
//
// change the ROUTE name for this , instead of category, add product
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

module.exports = router;

/*


*/
