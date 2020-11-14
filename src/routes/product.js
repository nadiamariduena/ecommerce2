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
// Robert told me that it s a better procedure to add "DONE" instead of calling it "cb" that
// stands for callback, as it helps me to differentiate it better when a function is actually "done"
//
// So done is the call back function, like the "done" in roberts example from yesterdays lesson
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, path.join(path.dirname(__dirname), "uploads"));
  },
  /*
  
  
  
  */
  filename: function (req, file, done) {
    // done(null, Date.now().toString() + "-" + file.originalname);  ROBERT
    done(null, shortid.generate() + "-" + file.originalname);
    /*
  
The short id here below focus into giving a productPicture ...
***   done(null, shortid.generate() + "-" + file.originalname);  ****
 giving a productPicture ... an unique id + the original file name 
 of the picture, thats why in the result you have this:
         "productPictures": [
            {
                "_id": "5faf849a4c5ac15739fbbe49",
                "img": "1605338266328-vvb41.jpg"
            },
            {
                "_id": "5faf849a4c5ac15739fbbe4a",
                "img": "1605338266330-tumblr_olgr2rdm7R1qln4yro1_640.jpg"
            },
            {
                "_id": "5faf849a4c5ac15739fbbe4b",
                "img": "1605338266330-tumblr_olgr2rdm7R1qln4yro1_640.jpg"
            }
        ],
  */
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
