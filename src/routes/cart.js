const express = require("express");
//HERE we are going to import the category schema
const { addItemToCart } = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware");
// Here we no longer need to add a adminMiddleware as normal user cannot add categories
// BUT what the user can do, is add to cart, therefore we need to put userMiddleware
const router = express.Router();
//
//
//           ****   C  *  A  *  R  *  T    ****
//
//

//
/*router.post(
    "/user/cart/add-to-cart",

    HERE YOU CAN WRITE anything you want like for example:

    /user/cart/add-to-basket
    etc etc...

    */
router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);
// instead of add category , the user will be able to addItemToCart);
// router.get("/category/getcategory", getCategories);  no longer needed!!!

module.exports = router;
