## ADD PRODUCT TO CART 🌻

_ONCE WE FINISH THE PRODUCT SET UP, IT S TIME TO PREPARE THE PRODUCT TO BE ADDED TO THE CART_

<br>

#### LETS UPDATE FEW THINGS BEFORE CONTINUING

- INSIDE THE auth.js/CONTROLLER

- ADD THE missing ROLE to the user

- ADD THE FOLLOWING:

```javascript
role: user.role;
```

- TO THIS:

```javascript

// -------------------------------------------
//
//        SIGN IN
//
// -------------------------------------------

exports.signin = (req, res) => {
  // the User is the imported data from the schema
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    // IF the user log in with something incorrect ,
    // launch an error message
    if (error)
      return res.status(400).json({
        error,
      });
    // ------ TOKEN | SESSION  ---------------------
    if (user) {
      // this authenticate is related to the function inside
      // the user.js /MODELS FOLDER
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",

```

<br>

#### IN THE ADMIN we already have this information stored, so dont bother!

<br>
<br>
<br>

## THE SHOPPING-CART :shopping_cart:

<br>

- CREATE THE SCHEMA
- CREATE THE ROUTES
- CREATE THE CONTROLLERS

<br>

##### CREATE THE SCHEMA

- - GO TO THE MODELS folder
- - CREATE THE SCHEMA for the CART
- - COPY the MODELS category.js
- - PASTE IT in the cart.js/models
- - REMOVE MOST OF THE STUFF and leave it like so:

```javascript
const mongoose = require("mongoose");
//
// -----------------------------------------
//
//              CART SCHEMA
//
// -----------------------------------------
//

const cartSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
// DONT FORGET to change the name of the collection:
//  from this : "Category" to "Cart"
```

<br><br>

#### NOW IMPORT THE USER AND PRODUCT SCHEMAS

- MAKE THE CONNECTION OR REF to link these 2 schemas to the CART.js

<br>

```javascript
const mongoose = require("mongoose");
//
// -----------------------------------------
//
//              CART SCHEMA
//
// -----------------------------------------
//

const cartSchema = new mongoose.Schema(
  {
    // 1 import the user schema to make the reference
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // so 1 user can buy serveral products, thats why you add the array
    cartItems: [
      {
        // 1 import the product schema to make the reference
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        // the default product is 1, so the basket cannot be empty
        price: { type: Number, required: true },
        // this is in case the price might vary in the future.
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
```

<br><br>

##### CREATE THE cart.js/ROUTES

- - GO TO THE ROUTES category.js
- - COPY THE category.js
- - PASTE IT in the cart.js/ROUTES
- - REPLACE FEW THINGS

> THE NEW THINGS: will be the function called "addItemToCart"
> this function hasn't been created yet

<br>

```javascript
const express = require("express");
//HERE we are going to import the category schema
const { addItemToCart } = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware/index");
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
```

<br>
<br>

#### NOW CREATE THE CONTROLLER/cart.js

- ADD THE FOLLOWING

- - IMPORT THE MODELS SCHEMA

<br>

```javascript
const Cart = require("../models/cart");
//
//
//                           ****   C  *  A  *  R  *  T    ****
//
// ----------------------
// A D D  item to CART
// ----------------------
//
exports.addItemToCart = (req, res) => {
  res.json({ message: "COWABUNGA TURTLE cart" });
};
```

<br>
<br>

#### NOW ADD THE cart.js/ROUTES to the INDEX.SERVER.JS file

```javascript
//
//---------------------
//  IMPORT the ROUTES
//---------------------
//
// cart
const cartRoutes = require("./routes/cart");
//
//
//
//---------------------
//   USE the ROUTES
//---------------------

//    C A R T .. ROUTES
app.use("/api", cartRoutes);
//
//
```

<br>
<br>

#### CHECK IF ALL IS OKAY IN THE SERVER THEN TEST IT ON POSTMAN

##### BEFORE testing the cart routes

- CREATE A NEW user (no admin)

- TYPE THE FOLLOWING URL:

`localhost:8000/api/signup`

- SIGN UP THE FOLLOWING DATA:

```javascript
{
     "firstName": "Cherubin",
    "lastName": "Ellon",
    "email": "cherubin@domain.com",
    "password": "enolagay"
}
//
// result
//
{
    "message": "User created Successfully"
}
```
<br>

##### NOW SIGNIN AND COPY THE TOKEN

- TYPE THE FOLLOWING URL:

`localhost:8000/api/signin`

```javascript
{

    "email": "cherubin@domain.com",
    "password": "enolagay"
}
//
// result
//

{
    "token": "ETCTEC here IS WHERE THE TOKEN GOES",
    "user": {
        "_id": "5faffd16f9b3423b98f6b8d2",
        "firstName": "Cherubin",
        "lastName": "Ellon",
        "email": "cherubin@domain.com",
        "role": "user",
        "fullName": "Cherubin, Ellon"
    }
}

```
<br>
<br>

##### NOW YOU ARE READY TO TEST THE CART ROUTES

- ADD A NEW TAB

- TYPE THE FOLLOWING URL:

`localhost:8000/api/user/cart/addtocart`

- CREATE A HEADER "authorization" then add the Bearer and the token code

- ADD THE FOLLOWING:

```javascript
{
    "email": "cherubin@domain.com",
    "password": "enolagay1225"
}
```

> for this to work, you have to be logged in, ALSO check the url is like
> it should be!!

- SEND POST request

```javascript
// RESULT
{
    "message": "COWABUNGA TURTLE cart"
}
```
