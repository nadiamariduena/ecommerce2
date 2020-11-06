const { check, validationResult } = require("express-validator");

exports.validateRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("lastName"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  // this is going to return an array of errors
  const errors = validationResult(req);

  /*
   validationResult(req) ,this is what you added 
   inside the controller/auth.js:

        const errors = validationResult(req);
  return res.status(400).json({ errors: errors.array() });

   and that you hided because your were repeating yourself
  */
  //
  //
  // if errors are greater > than 0 it means we have errors and if so
  //   send status 400 which is an ERROR
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
    // send only 1 error: json({ error:
    // but if the user the do the mistakes again, then it will send another error
    // errors.array()[0].msg });
  }
  next();
};
