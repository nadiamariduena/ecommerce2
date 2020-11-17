const express = require("express");
//HERE we are going to import the category schema
const { addItemToCart } = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const router = express.Router();
// you need this to create routers : const router = express.Router();
//
//
//
//
//           ****    C . A . T . E . G . O . R . Y   ****
//                            routes
//
//
//
// here you are adding the function that will need to be passed in order to add a product to cart
// like require Signin and userMiddleware, also the function addItemToCart
router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

module.exports = router;

/*
whenever you find:
addItemToCart 
Know that it s the function inside the controllers, that function will be used here
in the router

BUT since we are starting with the routes cart.js we will add it
anyway , later we will add the function in the controllers

After you finish here and that you have this, continue with the controllers:

const express = require("express");
//HERE we are going to import the category schema
const { addItemToCart } = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const router = express.Router();
//
//
//           ****    C . A . T . E . G . O . R . Y   ****
//
//
//
// /category/create
router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

module.exports = router;

*/
