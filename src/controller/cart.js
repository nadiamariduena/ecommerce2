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
//1
exports.addItemToCart = (req, res) => {
  // Cart.findOne({ user: req.user._id })
  //  this is going to check the user._id in the collection
  // inside mongo to see if he already exists
  // 4
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    //
    // 5
    if (error) return res.status(400).json({ error });
    if (cart) {
      //                 IF CART ALREADY EXISTS then update the cart by quantity
      //
      //
      //find the user with that id and then UPDATE the cart
      // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
      //  7
      Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          //  $push: is going to push the record in a sub-collection
          $push: {
            // here you add the name of the key
            cartItems: req.body.cartItems,
          },
        }//8
      ).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      }); //--------
    } else {
      //° 6 inside the 6 you have to introduce the step 2 and 3
      //                 IF THE CART DONT EXISTS then create a new cart
      //
      //2  here you create the new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      // --------
      // now SAVE
      // --------
      // 3
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
      // -------------------
    } // ----°
  });
};

/*







                            -----------------------------------
                            SEVERAL products inside a users cart
                            ------------------------------------



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


                           -----------------------------------
                            SEVERAL products IN DIFFERENT CARTS
                            ------------------------------------




const express = require("express");
const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  const cart = new Cart({
    user: req.user._id,
    cartItems: req.body.cartItems,
  });

  // ------
  cart.save((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      return res.status(201).json({ cart });
    }
  });
};
*/
