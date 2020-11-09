//
//
//            U . S . E . R
//
// -------------------------------------------
//
//           VERIFY A TOKEN
//             middleware
//
// -------------------------------------------

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // [1] is going to grab the token from the words "Bearer token"
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  // so that i can access that user in the next function
  next();
  // jwt.verify();
  // with the above you decode the TOKEN
};
/*






*/

const jwt = require("jsonwebtoken");

//            A . D .M . I . N
//
// -------------------------------------------
//
//           VERIFY A TOKEN
//             middleware
//
// -------------------------------------------

exports.requireSignin = (req, res, next) => {
  //
  //
  // if this exists and its not undefined: if (req.headers.authorization)
  //  then execute the code inside the if statement
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // [1] is going to grab the token from the words "Bearer token"
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    // so that i can access that user in the next function
    next();
    // jwt.verify();
    // jwt.decode);
    // with the above you decode the TOKEN
  }
  return res.status(400).json({ message: "Authorization Required" });
};

/*




*/
//
//      U S E R  -- C A T E G O R Y
//
// -------------------------------------------
//
//  ONLY LOGGED IN USER CAN CREATE CATEGORIES
//             middleware
//
// -------------------------------------------
//
exports.userMiddleware = (req, res, next) => {};

/*




*/
//
//      A D M I N  -- C A T E G O R Y
//
// -------------------------------------------
//
//  ONLY LOGGED IN ADMIN CAN CREATE CATEGORIES
//             middleware
//
// -------------------------------------------
//
exports.adminMiddleware = (req, res, next) => {
  // NO PERMISSION if its not an ADMIN
  // if the user is not !== an admin , it will launch a res.status 400
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};
