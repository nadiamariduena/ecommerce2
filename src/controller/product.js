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
  // 1   ------------------
  const { name, price, quantity, description, category, createdBy } = req.body;

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
      //
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

  // 2 ------------------
  //  Here we are translating what was send to me in step 1, to database DOCument
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  /*
  

                createdBy: req.user._id
                its automatically generated depending of the admin that
                is creating the product


*/

  //3  ------------------
  // now SAVE the steps and HANDLE the ERRORS

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


      // ASK ROBERT ABOUT what is the reason for all this rpocedure to get
      the multiple images


*/
