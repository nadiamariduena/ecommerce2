const shortid = require("shortid");

//
//                        ****  P R O D U C T     ****
//                               controller
//
//
//
const Product = require("../models/product");

exports.createProduct = (req, res) => {
  res.status(200).json({ file: req.files, body: req.body });
  //   before
  //   res.status(200).json({ message: "hello product controller" });
};
