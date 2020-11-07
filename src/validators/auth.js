const { check, validationResult } = require("express-validator");
//
//
//
//  *****  VALIDATE SIGNUP REQUEST ***
//  check the routes/ auth.js and the admin/auth.js
//
exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("lastName"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
//
//
//
//  *****  VALIDATE SIGNIN REQUEST ***
//
//
exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
//
// isRequestValidated  is a MIDDLEWARE
//  *****  IS REQUEST VALIDATED ***
//
//
exports.isRequestValidated = (req, res, next) => {
  // this is going to return an array of errors
  const errors = validationResult(req);
  // if errors are greater > than 0 it means we have errors and if so
  //   send status 400 which is an ERROR
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
    // send only 1 error: json({ error:
    // but if the user  do MORE mistakes, then it will send another error
    // errors.array()[0].msg });
  }
  next();
};
