<!--


S8sPhhZ4FMJt7Fon
sorZa


i will add the 4 files that relates this result
{
    "product": {
        "_id": "5fb2b67fbc97d77926a65a51",
        "name": "Marante",
        "slug": "Marante",
        "price": 60,
        "description": "Marante is a species of prayer plant. Native to Bolivia, it is commonly kept as a houseplant in temperate zones for its ornamental leaves. It requires partial shade, humidity, and good drainage to thrive.",
        "productPictures": [
            {
                "_id": "5fb2b67fbc97d77926a65a52",
                "img": "3jZkfoTVs-vvb41.jpg"
            },
            {
                "_id": "5fb2b67fbc97d77926a65a53",
                "img": "qBpsclRdbG-tumblr_olgr2rdm7R1qln4yro1_640.jpg"
            },
            {
                "_id": "5fb2b67fbc97d77926a65a54",
                "img": "jCNakSGTQB-tumblr_o58wbcM6pM1tn7avwo1_500.jpg"
            }
        ],
        "category": "5faae7535fee14484dadd9c8",
        "quantity": 1000,
        "createdBy": "5fb0de2ce930e814f00f3a47",
        "reviews": [],
        "createdAt": "2020-11-16T17:27:27.624Z",
        "updatedAt": "2020-11-16T17:27:27.624Z",
        "__v": 0
    }
}

------------------
pro  controler

const express = require("express");
const Product = require("../models/product");
//
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { name, price, description, category, quantity, createdBy } = req.body;
  //
  let productPictures = [];
  //
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  //
  const product = new Product({
    name: name,
    slug: slugify(name),
    //   here is where the  slug: slugify(name), works, its adding the file and the name together like this
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};




---------

product routes






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
//                        ****  P R O D U C T     ****
//                               routes
//
//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  //
  //
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

module.exports = router;



--------


product models


const mongoose = require("mongoose");
//
//
// -----------------------------------------
//
//           P R O D U C T  ***  SCHEMA
//
// -----------------------------------------
//
// This is a basic product schema, in the future you might add
// more columns
//
//
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      //   max: 5000, this is for the length of the description
    },
    // this is not "required", because offers on a product are not something permanent.
    offer: {
      type: Number,
    },
    productPictures: [{ img: { type: String } }],
    // here we will tell "who" can write a review on the product
    // Ref: "User" }], YOU ARE MAKING REFERENCE to the User Schema we have inside the user.js/MODELS and what the User contains: module.exports = mongoose.model("User", userSchema);
    reviews: [
      // here we are going to use the LINKING, it means that the person posting a review must have an account
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
      // So if that person needs to add a review, it needs to be logged in
      /*
      Since we have already created the User and the Category and all what is related
 to authenticate to check if its a user logged in or if the user is an admin
 , it s much more easier.
 */
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);











 -->
