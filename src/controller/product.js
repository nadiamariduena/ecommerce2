const shortid = require("shortid");
const Product = require("../models/product");
const slugify = require("slugify");
//
//                        ****  P R O D U C T     ****
//                               controller
//
//
//

exports.createProduct = (req, res) => {
  // the line below will help in the validation
  // 1
  const {
    name,
    price,
    description,
    productPictures,
    category,
    createdBy,
  } = req.body;
  // 2
  const product = new Product({
    name: req.body.name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  //3  now SAVE the steps and HANDLE the ERRORS

  product.save().exec((error, product) => {
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
--------
createdBy: req.user._id
its automatically generated depending of the admin that is creating the product
---------

req.body 
holds parameters that are sent up 
from the client as part of a POST request. 

See the API.

// POST user[name]=tobi&user[email]=tobi@learnboost.com
req.body.user.name
// => "tobi"

req.body.user.email
// => "tobi@learnboost.com"

// POST { "name": "tobi" }
req.body.name
// => "tobi"



*/
