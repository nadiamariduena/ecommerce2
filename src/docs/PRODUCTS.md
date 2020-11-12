## PRODUCT 🌻

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
//                        ****  P R O D U C T     ****
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

#### INSTALL THE FOLLOWING

- install Multer
  `npm install --save multer`

##### What is a multer?

_Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files._

> NOTE: Multer will not process any form which is not multipart (multipart/form-data).

<br>

[MORE ABOUT MULTER](https://www.npmjs.com/package/multer)

[MULTER VIDEO TUTORIAL](https://www.youtube.com/watch?v=9Qzmri1WaaE)

### RELATED

<br>
<hr>
<br>

#### Uploading form fields and files at the same time with Multer (Node.js, Typescript)

- Multer is a widely used middleware to handle file uploads and multipart/form-data stuff received by your Node.js server application. There are tons of documentation and tutorials to teach you how to use Multer to upload files to your application. It’s not that simple to figure out how to upload files and form data at the same time though!

##### The problem

- As you probably know, form data can be submitted with various encodings, form-data or multipart/form-data being the oldest and most widely used. You can also use x-www-form-uuencoded, raw or json but neither of these can easily transfer a file.

> But Express and its body-parser extension can’t parse multipart/form-data. ThePOST request will invoke the appropriate route, but req.body will be undefined. Only Multer can save us. (Well, not really, but this article is about Multer.)

##### The solution

[READ MORE)](https://medium.com/developer-rants/uploading-form-fields-and-files-at-the-same-time-with-multer-node-js-typescript-c1a367eb8198)

<br>

# 🌻

<br>

- install SHORT ID
  `npm install --save shortid`

> NOTE: shortid is deprecated, because the architecture is unsafe. we instead recommend Nano ID, which has the advantage of also being significantly faster than shortid

##### ShortId creates amazingly short non-sequential url-friendly unique ids. Perfect for url shorteners, MongoDB and Redis ids, and any other id users might see.

- By default 7-14 url-friendly characters: A-Z, a-z, 0-9, \_-
- Supports cluster (automatically), custom seeds, custom alphabet.
- Can generate any number of ids without duplicates, even millions per day.
- Perfect for games, especially if you are concerned about cheating so you don't want an easily guessable id.
- Apps can be restarted any number of times without any chance of repeating an id.
- Popular replacement for Mongo ID/Mongoose ID.
- Works in Node, io.js, and web browsers.
- Includes Mocha tests.

[More about ShortId](https://www.npmjs.com/package/shortid)

##### WHAT SHORTID does , is to jelp you to create an UNIQUE ID for your files FILENAME

<br>
<hr>
<br>
<br>

### NEXT 🌻

<br>

##### CREATE THE PRODUCT CONTROLLER

- GO TO THE CONTROLLER FOLDER and add the product.js

##### NOW GO TO THE product.js/ROUTES

- INSIDE THE product.js replace the following

```javascript
//
//
//
//                        ****  P R O D U C T     ****
//                               routes
//
//
//
// REPLACE this
router.post("/product/create", requireSignin, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Hello test" });
});
//
//
//  FOR THIS
router.post("/product/create", requireSignin, adminMiddleware, createProduct);
```

##### it should look likes this:

```javascript
const express = require("express");
//HERE we are going to import the product schema
// THE requireSignin and adminMiddleware is required for :
// the AUTHENTICATION purposes
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");
const router = express.Router();
//
//
//
const { createProduct } = require("../controller/product");

//
//
//                        ****  P R O D U C T     ****
//                               routes
//
//
// change the ROUTE name for this , instead of category, add product
router.post("/product/create", requireSignin, adminMiddleware, createProduct);

module.exports = router;
```

<br>
<br>

##### MOVE the following imports

- MOVE the following imports to the product.js/controller

```javascript
// import the Product S. C. H. E. M. A
const Product = require("../models/product");
```

<br>

##### it should look likes this:

```javascript
//
//
//                        ****  P R O D U C T     ****
//                               controller
//
//
//
const Product = require("../models/product");

exports.createProduct = (req, res) => {
  res.status(200).json({ message: "hello product controller" });
};
```

<br>

#### GO TO POSTMAN 😎

- log in again (admin)
- copy the token
- paste the token inside the Bearer
- click send

[<img src="../img/produc-controller-test.jpg">]()

> RESULT: its working!!!

<br>
<hr>
<br>

##### GO to the product.js/CONTROLLER

- require ShortId

```javascript
const shortid = require("shortid");
```

##### GO to the product.js/ROUTES

- require MULTER

```javascript
const multer = require("multer");
```

- CREATE a variable called upload

_This will serve to link the destination FOLDER of the files_

```javascript
//
//    U S I N G **  M U L T E R
//
// const upload , is the destination folder
// ({ dest: 'uploads/'}) , are the files
const upload = multer({ dest: "uploads/" });
```

<br>

##### ADD THE function related to molder inside the route

```javascript
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.single("productPicture"),
  createProduct
);

/*
  upload.single("productPicture"),

  FIRST WE WILL upload a single FILE, so here we are going 
  to put the input field name so the product image/picture

So this is the input field name of the product picture we will
send from the POSTMAN


*/
```

#### NOW GO TO THE CONTROLLER/product.js

- delete this and add this instead

```javascript
// delete this
res.status(200).json({ message: "hello product controller" });
// replace it with this:
res.status(200).json({ file: req.file, body: req.body });
/*
  
  By default we are going to get a file:

  file: req.file, body: req.body });

  what is happening here:

  Since we won't be storing our images in a database, but rather a simple folder for brevity and simplicity, let's make another folder within our project folder and name it, say, uploads.

  but if we do it in this way it s going to generate it by itself.

  So from the MOMENT you are going to click save to what you just typed
  it s going to GENERATE A "uploads" FOLDER.
  




                                  SOME OPTIONS

test/server.js/app.all
app.all('/upload/single/truncated', (req, res) => {
  if (!req.files) {
   return res.status(400).send('No files were uploaded.');
  }

  // status 400 to differentiate from ending the request in the on limit
  return req.files.testFile.truncated
   ? res.status(400).send(`File too big`)
   : res.status(200).send('Upload succeed');
 });


https://www.codota.com/code/javascript/functions/express/Request/files
  */
```

<br>

[<img src="../img/multer-test1.gif">]()

<br>
<br>

### RELATED

##### File Uploading Libraries

- There are several Node libraries available on NPM that can simplify the process of validating and uploading files to server. Among them, the most popular choice these days are Multer, Formidable, and Multiparty.

- Multer provides us control and flexibility when handling multipart/form-data requests - we get detailed information about each uploaded file, the ability to add a custom storage engine, validation of files according to our needs, the ability to set limits on uploaded files, etc.

- Project Setup
  Since we won't be storing our images in a database, but rather a simple folder for brevity and simplicity, let's make another folder within our project folder and name it, say, uploads.

[read More](https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/)

<br>
<br>

##### AFTER GENERATING THE "UPLOADS" FOLDER for the images

- GO TO POSTMAN

- INSTEAD OF USING RAW like for JSON (application/json)

- USE "form-data"

- While choosing the form you will have 2 headers

| key  | value     |
| ---- | --------- |
| name | some text |

| key     | value |
| ------- | ----- |
| product | File  |

<br>

> Note: On the file, you have to click on the Text with the arrow to get the dropdown option

<br>

#### CLICK on the image :sunflower:

- WATCH the video to follow the steps

[<img src="../img/multer-picture-storage1.gif">](https://www.youtube.com/watch?v=WH10ezaubts)

##### IF YOU NOTICE

> INSIDE THE UPLOADS folder (where the uploads made via postman are stored), the images are unreadable.

#### TO PREVENT THAT

- PASTE DE FOLLOWING CODE inside the products.js/ROUTES

```javascript
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
```
