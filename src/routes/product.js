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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

//
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });
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

/*





const express = require("express");
//HERE we are going to import the product schema
// THE requireSignin and adminMiddleware is required for :
// the AUTHENTICATION purposes
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");
//
const router = express.Router();
//
//    U S I N G **  M U L T E R
//
// _This will serve to link the destination FOLDER of the files_
const multer = require("multer");
// const upload , is the destination folder
// ({ dest: 'uploads/'}) , are the files

const shortid = require("shortid");
const path = require("path");
//

//
//
//
const { createProduct } = require("../controller/product");

//
//
//                        ****  P R O D U C T     ****
//                               routes
//


The following comes after we have set up the FILE updating and
after we uploaded the first image.

AFTER we checked the image inside the UPLOADS FOLDER, we noticed
that the images are unreadable, this why we are going to use the following
code:
const storage = multer.diskStorage({
  // this property has 2 arguments: destination and filename
  destination: function (req, file, cb) {
    // instead of adding this:     cb(null, '/tmp/my-uploads')
    // you will have to create a folder inside the src folder, in paralell to the server.index.js
    cb(null, path.join(path.dirname(__dirname), "uploads"));
    // you use this: __dirname to find the current directory of this file which is routes, so whenever we are using path.dirname,
    // its going to give the directory of current directory that is SRC
    // then you are going to add a last function path : path.join()
    // join in js: Convert the elements of an array into a string:
    //
    // before1: cb(null, '/tmp/my-uploads') from the original website
    // before2: cb(null, '../uploads')  but there was an error
  },
  filename: function (req, file, cb) {
    // instead of this : file.fieldname + "-" + Date.now() add this: shortid
    cb(null, shortid.generate() + "-" + file.originalname);
    // the .originalname was copied from the result of the upload of the image in postman
   
    the file.originalname
    the file
    you are grabing it inside the product.js/controllers
    in this line:
    res.status(200).json({ file: req.file, body: req.body });
    
  
  },
});
//
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });
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





*/
