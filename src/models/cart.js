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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        product: {
          // linking
          type: mongoose.Schema.Types.ObjectId,
          // the product collection
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
// DONT FORGET to change the name of the collection:
//  from this : "Category" to "Cart"

/*

How do we use information we have about our orders / products
and the reference to a product that we store in our order

user: {type: mongoose.Schema.Types.ObjectId, ref:"User",required:true},

How can we use that to return a merged RESULT?
ALSO where do we want to fetch it?
we could create a new end point/ new route or we use it on a existing point.

we could add information to our list of orders and to the individual order


-------------------------------------------
comments
-------------------------------------

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

*/
