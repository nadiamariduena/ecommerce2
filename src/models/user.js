const mongoose = require("mongoose");
//
// password security related
const bcrypt = require("bcrypt");
//

//                       ******
//
//                      userSchema
//
// --------------------------------------------------------
//
//
//
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, //trim will remove any space between the firstName
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true, //trim will remove any space between the firstName
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true, //trim will remove any space between the firstName
      unique: true, //any username should be unique
      index: true, // is necessary , so that we can QUERY based on the userName
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true, //trim will remove any space between the firstName
      unique: true, //any username should be unique
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
      //   YOU CAN specify the LENGTH
    },
    role: {
      type: String,
      enum: ["user", "admin"], //options
      default: "user", //here you setting up what the user's role will be
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

//                       ******
//
//                  PASSWORD related
//
// --------------------------------------------------------
userSchema.virtual("password").set(function (password) {
  // HASH the goddam plain text password
  // second parameter of hashSync => salting ROUNDS
  // (=> we add a salt 10 times ! and hash after each round again)
  this.hash_password = bcrypt.hashSync(password, 10);

  //
  // this correspond to the salt: ...ord, 10);
  // you are giving it a value from 1 to 10
  // SALT : it serves merely to prevent two users with the same password getting the same hash.
});

// ------------
// VIRTUAL KEY
// ------------

userSchema.virtual("fullName").get(function () {
  return `${this.firstName}, ${this.lastName}`;
});

// ------------
// methods
// ------------
//  related to password
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
// --------------------------------------------------------

module.exports = mongoose.model("User", userSchema);

/*
// --------------------------------------------------------


          QUESTIONS
// --------------------------------------------------------


1:

WHAT IS THE DIFFERENCE BETWEEN A NORMAL SCHEMA LIKE IN LINE 15
AND THE VIRTUAL SCHEMA IN LINE 84 AND 92



2
_id: user._id }
IS THIS MAKING allusion to the whole data of the user?


3 when to use arrow functions and when not?
*/
