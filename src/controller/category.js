const Category = require("../models/category");
const slugify = require("slugify");

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  //if, the req.body.parentId exists,
  // then we'll use the category object:  categoryObj.parentId
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  //  else: it will not be available, so if the categoryObj.parentId dont exist.
  const cat = new Category(categoryObj);
  //
  //   ------------
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });

    if (category) {
      // if there is no error, it will add the category you added
      return res.status(201).json({ category });
      //   201 success
    }
  });
  //   ------------
  //
};
