## :golf: EXPRESS VALIDATOR :golf:

#### What is express validator?

- Express Validator is an Express middleware library that you can incorporate in your apps for server-side data validation.

  <br>

- Express Validator is a set of Express. js middleware that wraps validator. js , a library that provides validator and sanitizer functions.

#### What does express sanitizer do?

- An express middleware for Caja-HTML-Sanitizer, which wraps Google Caja sanitizer. A useful complement to the express-validator -- to fill a gap now that XSS sanitization support has been removed from that module's parent node-validator

#### ABOUT EXPRESS VALIDATOR :

[read more](https://express-validator.github.io/docs/)

<br>

#### Validation middlewares

- These methods are all available via require('express-validator').

- check([field, message])

[read more](https://express-validator.github.io/docs/check-api.html)

<br>

### START by requiring the "Express Validator"

- GO TO THE auth.js/CONTROLLER and import/require express validator like so:

```javascript
const { check } = require("express-validator");
// { check } is the function you are going to work with, to check if the user
// add all the required info.
```

<br>

##### NOW ADD THE FOLLOWING DATA inside the array

```javascript
  [
    check("firstName").isEmpty().withMessage("firstName is required"),
    check("lastName").isEmpty().withMessage("lastName is required"),
    check("lastName"),
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
  ],
```

- As you can notice the array contains all the data we specified inside the "schema" , user.js/MODELS folder.

```javascript
const express = require("express");
const { signup, signin } = require("../controller/auth");
const { check } = require("express-validator");
// { check } is the function you are going to work with, to check if the user
// add all the required info.
const router = express.Router();
//
router.post(
  "/signup",
  [
    /*
  *****    OPEN AN ARRAY   *****
  *****    AND ADD THE DATA HERE    *****

                    */
  ],
  signup
);

router.post("/signin", signin);
module.exports = router;
```

<br>

#### NOW go to the auth.js CONTROLLER

- add the validations result: const { validationResult } = require("express-validator");

```javascript
// IMPORTS from the schema inside the MODELS
const User = require("../models/user");
const { validationResult } = require("express-validator");
//
//  TOKEN related
const jwt = require("jsonwebtoken");
```

##### CALL the validation result in the same file:

```javascript
// -------------------------------------------
//
//        SIGN UP
//
// -------------------------------------------
//
//

exports.signup = (req, res) => {


  const errors = validationResult(req);
  return res.status(400).json({ errors: errors.array() });
//
//

  // the User is the imported data from the schema
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    // etc ...
```

<br>

#### NOW TEST IT in POSTMAN

![rested](./src/img/expressvalidator_check1.gif)

#### ALTHOUGH THE ERROR MESSAGE is correct , there is a mistake in the check area:

- REPLACE the .isEmpty() for .notEmpty()

```javascript
router.post(
  "/signup",
  [
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("lastName"),
    check("email").isEmail().withMessage("Valid Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
  ],
  signup
);
```

- like so:

![rested](./src/img/notEmpty.gif)

<br>

#### DONT REPEAT YOURSELF 🤚

<br>

##### FOR THIS REASONS WE ARE GOING TO REMOVE THE FOLLOWING AND ADD IT INTO A new FOLDER that will contain just the VALIDATORS

- create a new folder in the src

- the folder will be named: validators

- INSIDE the validators , create a file called: auth.js

- INSIDE THE auth.js/VALIDATORS add the following:

```javascript
// COPY the check[ ] data inside the auth.js /ROUTES and paste it inside the auth.js/VALIDATORS

exports.validateRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("lastName"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
```

<br>

##### CLICK ON THE IMAGE TO CHECK THE PROCESS:

[<img src="./src/img/validators_process.gif">](https://www.youtube.com/watch?v=FCog1nieqQ8)

#### auth.js/validators

```javascript
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
//
//
// isRequestValidated  is a MIDDLEWARE
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

/*
   validationResult(req) ,this is what you added 
   inside the controller/auth.js:

        const errors = validationResult(req);
  return res.status(400).json({ errors: errors.array() });

   and that you hided because your were repeating yourself
  */
//
//
```

<br>
<br>

<br>

#### AFTER OBTAINING THE RESULT

- "change" THE FOLLOWING:

<br>

##### CLICK ON THE IMAGE TO FOLLOW THE STEPS:

[<img src="./src/img/change_validateRequest_for_validateSignupRequest.jpg">](https://www.youtube.com/watch?v=uLFdDOzJhqI)

- CHANGE validateRequest for validateSignupRequest

- DUPLICATE validateSignupRequest and delete this:

```javascript
check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("lastName"),
```

<br>
<br>

#### the validators/auth.js should look like this:

```javascript
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
```