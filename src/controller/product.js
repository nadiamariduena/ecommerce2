const express = require("express");
const Product = require("../models/product");
//
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  // the line below will help in the validation
  // 1   ------------------
  const { name, price, description, category, quantity, createdBy } = req.body;
  // 5 remove the productPictures from the step 1
  // 6 add it here
  let productPictures = [];
  // in allusion to this: upload.array("productPicture"),
  // 4 ------------------
  // Here its checking if any file where uploaded to me  and IF so...
  if (req.files.length > 0) {
    // 7
    // so, map/loop the pictures inside the "files"
    // which is productPicture data from the outside/ the req.body we received
    productPictures = req.files.map((file) => {
      return { img: file.filename };
      // Here we create an image object for every single "file" we receive
      /*
      
      You cannot show it like this : return file.filename;
      and the reason for that is because inside the product
       schema we have it like so:
      
       productPictures: [{ img: { type: String } }],
       As you can see, its an array with an object inside of it
      
      */
    });
  }
  //
  // 2 ------------------
  // after that, we CONSTRUCT the product DOCUMENT: const product = new Product({
  //  we are basically translating what was send to me in step 1, to database DOCument
  const product = new Product({
    name: name,
    slug: slugify(name),
    //   here is where the  slug: slugify(name), works, its adding the file and the name together like this
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id,
  });
  /*
  
                createdBy: req.user._id
                its automatically generated depending of the admin that
                is creating the product
*/
  //3  ------------------
  // now SAVE the steps and HANDLE the ERRORS
  //
  //
  product.save((error, product) => {
    //
    // ERROR HANDLING
    // if there is an error, return a response 400 with a message json that says "error"
    if (error) return res.status(400).json({ error });
    // if the saving was successful, show the product
    if (product) {
      res.status(201).json({ product });
    }
  });
};

/*


{
    "product": {
        "_id": "5fb2b67fbc97d77926a65a51",
        "name": "Marante",
        "slug": "Marante",
        "price": 60,
        "description": "Marante is a species of prayer plant. Native to Bolivia, it is commonly kept as a houseplant in temperate zones for its ornamental leaves. It requires partial shade, humidity, and good drainage to thrive.",
        "productPictures": [
            {
                "_id": "5fb2b67fbc97d77926a65a52",
                "img": "3jZkfoTVs-vvb41.jpg"
            },
            {
                "_id": "5fb2b67fbc97d77926a65a53",
                "img": "qBpsclRdbG-tumblr_olgr2rdm7R1qln4yro1_640.jpg"
            },
            {
                "_id": "5fb2b67fbc97d77926a65a54",
                "img": "jCNakSGTQB-tumblr_o58wbcM6pM1tn7avwo1_500.jpg"
            }
        ],
        "category": "5faae7535fee14484dadd9c8",
        "quantity": 1000,
        "createdBy": "5fb0de2ce930e814f00f3a47",
        "reviews": [],
        "createdAt": "2020-11-16T17:27:27.624Z",
        "updatedAt": "2020-11-16T17:27:27.624Z",
        "__v": 0
    }
}



*/
