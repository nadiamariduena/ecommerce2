const express = require("express");
const router = express.Router();
const User = require("../models/user");

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.get("/signin", (req, res, next) => {});

/* 



*/

router.post("/signup", (req, res, next) => {
  // the User with the SCHEMA data
  User.findOne({
    /*  if inside the req.body which is the 
    data that the user is sending using the structure inside the schema
    , if in that data there's a similar email,
    then send an error.

    */
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
          user: data,
        });
      }
    });
  });
});

module.exports = router;

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
