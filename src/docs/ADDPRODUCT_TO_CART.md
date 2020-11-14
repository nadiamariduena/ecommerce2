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

##### IN THE ADMIN we already have it

<br>
<br>
<br>

### THE SHOPPING-CART :shopping_cart:

- GO TO THE MODELS folder
- CREATE THE SCHEMA for the CART
- COPY the MODELS category.js
- PASTE IT in the cart.js/models
- REMOVE MOST OF THE STUFF and live it like so:

```javascript
const mongoose = require("mongoose");
//
// -----------------------------------------
//
//              SHOPPING-CART SCHEMA
//
// -----------------------------------------
//

const cartSchema = new mongoose.Schema({




    
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
// DONT FORGET to change the name of the collection:
//  from this : "Category" to "Cart"
```
