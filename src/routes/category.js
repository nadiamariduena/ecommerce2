const express = require("express");
//HERE we are going to import the category schema
const Category = require("../models/category");
const slugify = require("slugify");
const router = express.Router();
//
//
//           ****    C . A . T . E . G . O . R . Y   ****
//
//
// HERE YOU ARE GOING TO SPECIFY THE API
// /category/create
router.post("/category/create", (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  //if, the req.body.parentId exists, then we'll use the category object:  categoryObj.parentId
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  //   else: it will not be available, so if the categoryObj.parentId dont exist.
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
});

module.exports = router;
