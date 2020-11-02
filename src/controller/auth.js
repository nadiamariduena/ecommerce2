// IMPORTS from the schema inside the MODELS
const User = require("../models/user");
//  TOKEN related
const jwt = require("jsonwebtoken");
//
//
// -------------------------------------------
//
//        SIGN UP
//
// -------------------------------------------
//
//
// here you dont need NEXT because you are not passing a request
exports.signup = (req, res) => {
  // the User is the imported data from the schema
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user)
      // if the user sends an existent email, return 400 status
      return res.status(400).json({
        message: "User already registered",
      });
    //
    //
    const { firstName, lastName, email, password } = req.body;
    //Its says YOU KNOW WHAT create a new User:
    // new User(
    //  "based" on
    //the User model schema in (user.js/models) , and pass inside those guys
    // (req.body);
    //so the data the user is giving:
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(), //its going to generate some random number
    });

    //                      ** SAVING the DATA **
    //
    // to save the data the user sent, you need the following:
    _user.save((error, data) => {
      // IF ERROR
      // if there s any error in the data, return status 400 and "something went wrong"
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      // IF SUCCESS , SAVE the data
      if (data) {
        return res.status(201).json({
          message: "User created Successfully",
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
  // the User is the imported data from the schema
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    // IF the user log in with something incorrect , launch an error message
    if (error)
      return res.status(400).json({
        error,
      });
    // ------ TOKEN
    if (user) {
      // this authenticate is related to the function inside the user.js /MODELS FOLDER
      if (user.authenticate(req.body.password)) {
        //
        //
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        // you can say this TOKEN will expire after 1d or 2 days
        // {expiresIn: "2d"}

        const { firstName, lastName, email, role, fullName } = user;

        /*


//  send the response after setting up the expiration of the token






       - so if the user
            // ------ TOKEN
                if (user) {
       - and the password is true when authenticating: 
        if (user.authenticate(req
        -  so we can use the User data
        jwt.sign({_id: user._id})
         user._id})
        - so that we can get the "user" from this
        callback function :
        exec((error, user) => {
          this user will reach this "User":
       User.findOne

       and this "User" is going to findOne user with
       that data and once it does, it will show all the
       data from that user.
        
        
        
        */
        //
      }
    } else {
      return res.status(400).json({ message: "Something went WRONG" });
    }
    //

    //
  });
};

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
