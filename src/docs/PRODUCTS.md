## PRODUCTS 🌻

_ONCE THE CATEGORY AND SUBCATEGORIES HAS BEEN CREATED, YOU CAN PROCEED WITH THE PRODUCTS_

<br>

#### START BY CREATING THE PRODUCT SCHEMA

```javascript
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
```

###### _LIKE THIS you can link to already existent SCHEMAS_

```javascript

type: mongoose.Schema.Types.ObjectId, ref: "User",

//here you grab the Schema name you use to export your schema
ref: "User",

```

<br>

#### THEN ADD THE ROUTE connected to this PRODUCT SCHEMA

- GO TO THE ROUTES
- CREATE a product.js
- COPY the category content from the routes and paste it inside the products.js/ROUTES
- REPLACE the category data for the PRODUCT

```javascript
const express = require("express");
//HERE we are going to import the category schema
//  H I D E the following as we still have to create a controller for the product
// const { addCategory, getCategories } = require("../controller/category");
//
//
// import the Product S. C. H. E. M. A
const Product = require("../models/product");
//
// THE requireSignin and adminMiddleware is required for the AUTHENTICATION purposes
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");
const router = express.Router();
//
//
//           ****    C . A . T . E . G . O . R . Y   ****
//
//
//
// change the ROUTE name for this , instead of category add product
router.post("/product/create", requireSignin, adminMiddleware, (req, res) => {
  //  to test it
  res.status(200).json({ message: "Hello test" });
});
//
//  H I D E the following :
// router.get("/category/getcategory", getCategories);

module.exports = router;
```

<br>

##### SINCE we are going to UPLOAD images, we cannot send Json response, so we cannot accept json DATA

- START by testing it with this:

`res.status(200).json({message: "Hello test"})`

- GO TO POSTMAN and open another tab, choose POST, add this url and SEND: localhost:8000/api/product/create

- you will have the following ERROR like so:

```javascript
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Error</title>
    </head>
    <body>
        <pre>Cannot GET /api/product/create</pre>
    </body>
</html>
```

<br>

##### GO TO the index.server.js and import the route related to the PRODUCT

```javascript
//---------------------
//  IMPORT the ROUTES
//---------------------
//
// product
const productRoutes = require("./routes/product");

//    P R O D U C T .. ROUTES
app.use("/api", productRoutes);
//
//
```

<br>

#### THE ERROR

```javascript
typeError: Invalid schema configuration: "User" is not a valid type at path 'ref'
```

##### IS RELATED to this :

```javascript
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
    ],

    // B E F O RE i had this:
userId: mongoose.Schema.Types.ObjectId, ref: "User",

// the correction:
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

```

<br>

##### NOW GO TO POSTMAN and test it again

```javascript
// R E S U L T
{
"message": "Authorization Required"
}
```

##### SO LOGIN

- COPY the token, in the new tab and add the headers again:

- key: Authorization | value: Bearer and the token code

<br>

##### NOW send the request again

<!--

[<img src="./src/img/product-route-test.gif">]()

 -->

[<img src="../img/product-route-test.gif">]()

<br>
<br>

## NEXT STEP 🌻

<br>

#### INSTALL "MULTER"

`npm install --save multer`

##### What is a multer?

_Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files._

> NOTE: Multer will not process any form which is not multipart (multipart/form-data).

<br>

[MORE ABOUT MULTER](https://www.npmjs.com/package/multer)
