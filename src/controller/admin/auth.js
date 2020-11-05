// IMPORTS from the schema inside the MODELS
const User = require("../../models/user");
//  TOKEN related
const jwt = require("jsonwebtoken");
//
//
//
//                              ****      A . D . M . I . N      ****
//
//
//
//
//
// -------------------------------------------
//
//                           SIGN UP  ADMIN
//
// -------------------------------------------
//
//
exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });
    //
    //
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role: "admin",
    });

    //
    //
    // saving the data
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      // IF SUCCESS , SAVE the data
      if (data) {
        return res.status(201).json({
          message: "Admin created Successfully",
        });
      }
    });
  });
};

// -------------------------------------------
//
//        SIGN IN
//
// -------------------------------------------

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error)
      return res.status(400).json({
        error,
      });
    // ------ TOKEN | SESSION  ------------------------------
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });

        // ------ TOKEN | SESSION  ------------------------------
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      // -- ° --
    } else {
      return res.status(400).json({ message: "Something went WRONG" });
    }
  });
};

//
//
//

//
//
//
// -------------------------------------------
//
//           VERIFY A TOKEN
//
// -------------------------------------------
// [1] is going to grab the token from the words "Bearer token"

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  // so that i can access that user in the next function
  next();
  // jwt.verify();
  // with the above you decode the TOKEN
};

/*


/*











                400 Bad Request response status code indicates that 
                the server cannot or will not process the request due
                to something that is perceived to be a client error 
                (e.g., malformed request syntax, invalid request message
                    framing, or deceptive request routing).


                             The HTTP 201 Created success status response code 
                            indicates that the request has succeeded and has 
                            led to the creation of a resource. ... The common 
                            use case of this status code is as the result of 
                            a POST request.
    
    */
