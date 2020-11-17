const express = require("express");
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

  // Cart.find   will check if the "user ID" already
  // exist, this means the cart is already created for the user and
  // there s no need to add a new cart
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //                 IF CART ALREADY EXISTS then update the cart by quantity
      //UPDATE the cart
      Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            cartItems: req.body.cartItems,
          },
          //   Cart.findOneAndUpdate(); will find the cart from the user._id and update it
          //  to test if you can push an update write the lines above
          //
          //
        } //------- without this below, you cannot see the result in postman
      ).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      }); //--------
      //
      //
      // just for now write the following
      //   res.status(200).json({ message: cart });
    } else {
      //                 IF THE CART DONT EXISTS then create a new cart
      //
      // here you create the new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      // ------------------
      // now SAVE
      // ------------------
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
