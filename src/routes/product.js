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
  /*
SINCE we are going to UPLOAD images, we cannot send Json response,
so we cannot accept json DATA therefor we are going to accept the
FORM DATA. 
1_ start by testing it with this:
res.status(200).json({message: "Hello test"})
GO TO POSTMAN and open another tab, choose POST, add this url and SEND: localhost:8000/api/product/create
2_ you will have the following ERROR like so:

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

3_ go to the index.server.js and import the route related to the PRODUCT then app.use it!!
4_ the problem typeError: Invalid schema configuration: "User" is not a valid type at path 'ref'
IS RELATED to this :

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
    ],

   this line MORE EXACTLY:  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   B E F O RE i had this:  userId:  mongoose.Schema.Types.ObjectId, ref: "User",

5_ NOW GO TO POSTMAN and test it again
result:
{
    "message": "Authorization Required"
}

6_ SO LOG in , take the token, in the new tab add the headers again:

key: Authorization | value: Bearer and the token code
------------------------------------------------------

7_ NOW send the request again 



result






*/

  res.status(200).json({ message: "Hello test" });

  /*


*/
});
//
//  H I D E the following :
// router.get("/category/getcategory", getCategories);

module.exports = router;
