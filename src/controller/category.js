const Category = require("../models/category");
const slugify = require("slugify");

// -------------------
//  THIS is related to the :
// -----------------
// C A T E G O R Y list  ********* check on the bottom
//
// R E C UR S I V E function related to the branches of the subcategories

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) {
    // here its going to fetch all the parent categories
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    // it will fetch data based on the ID
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  // ---
  for (let cate of category) {
    // it will push an object
    categoryList.push({
      _id_: cate._id,
      name: cate.name,
      slug: cate.slug,
      // here below is the recursive call, in the call you are passing the complete categories
      // which is "categories" , then to filter the result you are going to pass the id of the current id  (categories, cate._id),
      children: createCategories(categories, cate._id),
    });
  }
  // ---
  return categoryList;
  // dont forget to return it otherwise you will see an empty arrow inside the postman when testing it
}
// ------------------
// ------------------
/*







*/
// ------------------
// A D D  category
// ------------------
exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  //
  //   ------------
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });

    if (category) {
      return res.status(201).json({ category });
      // if there is no error, it will add the category you added
      //   201 success
    }
  });
  //   ------------
  //
};
//   -------------------------------------------------
//
// FETCH or .getCategories

exports.getCategories = (req, res) => {
  // if you pass an empty object like so: .find({})  its going to  retrieve/GET all the data
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    //
    //
    //
    if (categories) {
      // -----------------
      // C A T E G O R Y list  *********
      // AFTER ADDING THE SUB-CATEGORIES
      // WRITE the recursive function here:
      const categoryList = createCategories(categories);
      // -----------------
      // this was replaced by categoriesList for the recursive function related to the
      //  branches of the subcategories, that is on top of this file.
      res.status(200).json({ categoryList });
      // before caegoriesList it was categories
      // res.status(200).json({ categories });
    }
  });
};

/*





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












*/
