const Cart = require("../models/cart");
//
//
//                           ****   C  *  A  *  R  *  T    ****
//
//
//
// ----------------------
// A D D  item to CART
// ----------------------
//
exports.addItemToCart = (req, res) => {
  //   res.json({ message: "COWABUNGA TURTLE cart" });

  const cart = new Cart({
    //   HERE BELOW: we are getting the user ID
    user: req.user._id,
    //
    cartItems: req.body.cartItems,
    /* HERE ABOVE: we are getting the usER CART(which is in cart.js/models), 
      you have the carItems array that contains a few things.
      */
  });

  //
  //
  //

  // ------------------
  // now SAVE the steps and HANDLE the ERRORS

  cart.save((error, cart) => {
    //
    // ERROR HANDLING
    // if there is an error, return a response 400 with a message json that says "error"
    if (error) return res.status(400).json({ error });
    // if the saving was successful, show the cart
    if (cart) {
      // if it s succesful, save the record
      //   and return the cart
      res.status(201).json({ cart });
    }
  });
};
