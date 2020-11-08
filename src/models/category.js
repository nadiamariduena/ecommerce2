const mongoose = require("mongoose");
//
// -----------------------------------------
//
//              CATEGORY SCHEMA
//
// -----------------------------------------
//
// DONT FORGET TO INSTALL and IMPORT , the "slugify" library inside the category.js/routes
// npm install --save slugify
const categorySchema = new mongoose.Schema(
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
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
