## THE SCHEMA / MODEL 😎

##### FIRST WE WILL START BY STRUCTURING THE USER SCHEMA AND FROM THERE WE WILL SET UP THEN THE USER AUTHENTICATION.

- INSIDE THE user.js/MODELS folder

- the Schema below will serve to structure the users data
  <br>

```javascript
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: { type: String },
  },
  { timestamps: true }
);
```

<br>

##### SET UP THE PASSWORD also in the schema user.js

- install the following:

```javascript
npm install --save bcrypt

```

- IMPORT IT on top of the file user.js /models

```javascript
//
// password security related
const bcrypt = require("bcrypt");
```

###### THEN BELOW this:

```javascript
const userSchema = new mongoose.Schema({
  /*
    
    all the data of the schema
    
    */

  timestamps: true,
});
```

##### add the following:

```javascript
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});
// method related to password
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
```

##### HOW IT SHOULD look like:

```javascript
const mongoose = require("mongoose");
//
// password security related
const bcrypt = require("bcrypt");
//
//
//                       ******
//
//                      userSchema
//
// --------------------------------------------------------

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: { type: String },
  },
  { timestamps: true }
);
//                       ******
//
//                  PASSWORD related
//
// --------------------------------------------------------
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
  //
  // this correspond to the salt: ...ord, 10);
  // you are giving it a value from 1 to 10
  // HASH the goddam plain text password
  // second parameter of hashSync => salting ROUNDS
  // (=> we add a salt 10 times ! and hash after each round again)
  // SALT : it serves merely to prevent two users with the same password getting the same hash.
});
// method related to password
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
// --------------------------------------------------------

module.exports = mongoose.model("User", userSchema);
/*
the User on itself represents the data inside the userSchema 
and is the User that will be exporting it.
*/
```

<br>

#### what is BCRYPT?

##### General Hash Function Background

- In general, a hash algorithm or function takes data (i.e., the password) and maps to "fixed-size values," or creates a "digital fingerprint," or hash, of it. This hash is not exactly the same as the Ruby class, but they are similar. A hashing algorithm is like a key-value pair of passwords and their encryptions, but you wouldn't want to store or save them like that! The process is never truly "reversible," in the sense that if I hashed a list of passwords, and all you had was a list of unique crypts, the only way you could "hack" my passwords would be through something like brute force search. But you could never take a hashed value and return it to its original form!

  <br>
  <br>

#### THE NEXT STEP

- WILL be to export the User from models to the user.js in ROUTES

```javascript
const express = require("express");
const router = express.Router();
const User = require("../models/user");

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.get("/signin", (req, res, next) => {});

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
      //   to generate a random number to use in username
      username: Math.random().toString(),
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
```

#### THE ERROR HAD to do with the name of the DATABASE i put inside the .env

- Since i am after all starting another ecommerce app with the same info
  i should always change this and of course for that , i have to create a new database name
  inside the mongo atlas

```javascript
// inside the .env folder  , do this before start the app
MONGO_DB_DATABASE = tomatoes;
```

##### Now you can test in POSTMAN

![rested](../img/result_after_changing_DB.jpg)

- After you type the data on the top of the image, the result will be shown on the bottom.

- from the moment you do that, you cannot click SEND again as it will say that the data you are trying to enter already exists, that data is now stored here:

##### RESULT in ATLAS

![rested](../img/result-after-changing-db-name.png)

<br>
<br>
<br>

#### GO TO the CONTROLLER folder

- and add a user.js file
- COPY AND PASTE

- COPY the following from the user.js inside the ROUTES and paste it inside the controller user.js

```javascript
// IMPORTS from the schema inside the MODELS
const User = require("../models/user");
//
// you will export import the whole content of this file with this:
// const { signup } = require("../controller/user");
// this will be added inside the routes

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
        message: "User created Successfully",
      });
    }
  });
});
```

<br>

#### INSIDE THE user.js /CONTROLLER, REPLACE the following:

```javascript
//  replace this:
module.exports = (req, res) => {
  //  for this:
exports.signup = (req, res) => {
//   this function  makes reference to this:

//
//   // this function is inside the user.js / ROUTES
router.post("/signup", (req, res, next) => {


});
```

<br>

#### EXPORT the controllers user.js DATA:

```javascript
exports.signup = (req, res) => {
```

<br>

#### GO TO THE ROUTES / user.js

- IMPORT the content of the controllers like so:

- Since the exports.signup is a function, you must to import it in this way:

```javascript
// ROUTES folder : user.js
// you will export import the whole content of this file with this:
const { signup } = require("../controller/user");
// this will be added inside the routes
```

<br>

#### THE user.js inside the ROUTES should look like this:

```javascript
const express = require("express");
const { signup } = require("../controller/user");
const router = express.Router();

//
//
//
//
router.post("/signup", signup);

router.post("/signin", (req, res, next) => {
  // the User with the SCHEMA data
});

module.exports = router;
```

#### RENAME the user.js / in CONTROLLER

- from user.js to auth.js

<br>
<br>
<hr>
<br>
<br>

#### RENAME the user.js / in ROUTES

- from user.js to auth.js

##### CHECK IF THE SERVER IS STILL RUNNING, check also POSTMAN

```javascript
// result after changes from user to ROUTES
server is running in PORT 2000
Data base connnnnected :)

```

- after you added another user in POSTMAN to test if the changes from user.js to auth.js DIDNT affect the app, check if the new user was added in the collection inside the atlas

<br>

# :briefcase: TOKEN | COOKIES | SESSIONS :briefcase:

<br>

##### CREATE THE "SIGN IN" BUT BEFORE | INSTALL THE FOLLOWING:

- npm install jsonwebtoken

##### THEN require it

```javascript
//  TOKEN related
const jwt = require("jsonwebtoken");


//
// IT SHOULD LOOK LIKE THIS in the dependencies
  "dependencies": {
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-validator": "^6.6.1",
    //
    "jsonwebtoken": "^8.5.1",
    //
    "mongoose": "^5.10.10",
    "nodemon": "^2.0.6"
  }

```

<br>

# TOKEN

## JSON Web Signature (JWS)

<br>

#### What is in a JWT token?

- JSON Web Token (JWT) is a means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS) and/or encrypted using JSON Web Encryption (JWE).

<br>

#### NOW create the SING IN, that will be used in the auth.js / ROUTES

<br>

```javascript
   if (user.authenticate(req.body.password)) {
```

<br>

###### So what it means:

- IF THE USER EXISTS "authenticate successful" , we are going to
  return a "TOKEN" so that we can manage the user session, so
  whenever a USER log in, he will send a TOKEN every request so we can
  verify fron the BACKEND

    <br>

  #### THE TOKEN

  `const token = jwt.sign({ _id: user._id });`

  <br>

```javascript
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
        const token = jwt.sign({ _id: user._id });
        //
        /*

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
        
        after this go to the .env and create the secret key
        like so:
        JWT_SECRET=MERNSECRET

        NOW GO TO AUTH.JS / controller
        
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
```

#### GO TO THE .env AND ADD THE FOLLOWING:

```javascript
JWT_SECRET = MERNSECRET;
```

<br>

- then add it inside the auth.js/ controllers :

<br>

```javascript
 const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
```

<br>

### THE EXPIRATION OF THE TOKEN

```javascript
    if (user) {
      // this authenticate is related to the function inside the user.js /MODELS FOLDER
      if (user.authenticate(req.body.password)) {
        //
        // THE EXPIRATION -----------
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
            // THE EXPIRATION -----------
            //
        // you can say this TOKEN will expire after 1d or 2 days
        // {expiresIn: "2d"}
```

<br>

<br>

##### After setting up the expiration of the TOKEN:

### CREATE THE VIRTUAL KEY :key:

- go to the user.js/ MODELS

- create a new schemas: userSchema.virtual("fullName")

```javascript
// ------------
// VIRTUAL KEY
// ------------

userSchema.virtual("fullName").get(function () {
  return `${this.firstName}, ${this.lastName}`;
});
```

#### now go back to the auth.js/controllers | After setting up the expiration of the TOKEN, send the response but before:

- fullName

`fullName } = user;`

```javascript
//  It should look like so:
const { firstName, lastName, email, role, fullName } = user;
```

#### SO once its done, you should add the 200 STATUS after the user authentication was SUCCESSFUL but is the password is wrong , send a 400 message

```javascript
        const { firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
        /*
        So if this password fails to get MATCH, we will return another
        response status 400

        */
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }

      // -- ° --
```

<br>
<br>

#### NOW GO TO auth.js / ROUTES AND REMOVE stuff

```javascript
// REPLACE THIS:

router.post("/signin", (req, res, next) => {
  // the User with the SCHEMA data
});

//
// FOR THIS:

// DONT FORGET TO REQUIRE IT
const { signup, signin } = require("../controller/auth");
//
//
router.post("/signin", signin);
```

<br>
<br>

#### AT THE END ITS SHOULD LOOK LIKE THIS:

```javascript
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
    // ------ TOKEN | SESSION  --------------------------------------------------------
    if (user) {
      // this authenticate is related to the function inside the user.js /MODELS FOLDER
      if (user.authenticate(req.body.password)) {
        /* if this password above fail to match , go to line 105 and send the error, 
              } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
        but 
        if the pass is 
         correct send response :
                // THE RESPONSE
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });*/
        //????
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        // you can say this TOKEN will expire after 1d or 2 days
        // {expiresIn: "2d"}
        //
        //
        // THE RESPONSE
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
        /*
        So if this password fails to get MATCH, we will return another
        response status 400
        
        */
        // ------ TOKEN | SESSION   end -------------------------------------------------
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
```

<br>

##### GO TO THE "POSTMAN" and create a new user, add the following:

- method POST
- type the following url: localhost:2000/api/signup

- fill the box with this and then click send:

```javascript
{
     "firstName": "melissa",
    "lastName": "neira",
    "email": "neira@domain.com",
    "password": "clfosddud"
}
```

#### result:

```javascript
{
    "message": "User created Successfully"
}
```

##### THE MESSAGE will be different of you send a request with a data that you already have, in that case the essage will be "you have already enregistered that user" pr something like that

<br>

![rested](../img/token_cookies.gif)

##### SO this is the result of this:

```javascript
 // ------ TOKEN | SESSION  ---------------------------------------------
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
        // ------ TOKEN | SESSION   end ----------------------------------
      } else {
```

![rested](../img/signup_token.jpg)

<br>

#### NOW go to THE ATLAS and delete what you just created in the image above, as its SENSITIVE DATA.

![rested](../img/mongo_user_purge.jpg)

<br>
<br>
<br>
<hr>
<br>

#### CREATE A PAGE WHERE THE "LOGGED IN " CAN NAVIGATE

- ONCE THE USER is logged in
- this will be one of the protected routes he will be allowed to navigate

```javascript
router.post("/profile", (req, res) => {
  res.status(200).json({ user: "profile" });
});
```

<br>

#### NOW GO TO "postman" and check if the new route "profile" works

- Type : localhost:2000/api/profile

###### RESULT:

```javascript
{
    "user": "profile"
}
```

<p>RIGHT NOW this is just normal POST request, We havent verified the REQUEST like in the case he was logged IN</p>

- For that we will need to create another MIDDLEWARE

<br>

<br>

## VERIFY A TOKEN

##### GO TO auth.js / CONTROLLER

- under the SIGNIN function , export.require the following:

```javascript
// -------------------------------------------
//
//           VERIFY A TOKEN
//
// -------------------------------------------
exports.requireSignin = (req, res, nex) => {
  jwt.decode();
  // with the above you decode the TOKEN
};
```

##### GO TO the "postman"

- attach some headers

- type: Authorization in a new field

- type: Bearer token

- click send, so to receive the req with the new fields

![rested](../img/authorization_bearertoken.jpg)

<br>

##### GO TO auth.js / CONTROLLER

- NOW THAT YOU FILLED THE FIELDS inside the "Headers"

- add the headers like so: const token = req.headers.authorization;

```javascript
exports.requireSignin = (req, res, nex) => {
  const token = req.headers.authorization;
  console.log(token);
  next(); //****** dont forget this
  // hide this when you are going to console log it: jwt.decode();
  // jwt.decode();
  // with the above you decode the TOKEN
};
```

##### next(); //**\*\*** dont forget this

- AS it will call the next function where this is:

- if you forget , you will have an error

```javascript
// auth.js /routes
res.status(200).json({ user: "profile" });
```

<br>

##### GO TO auth.js / ROUTES , and Add the "requireSignin" function

- IMPORT THE NEW FUNCTION on the top of the auth.js / routes

```javascript
const { signup, signin, requireSignin } = require("../controller/auth");
```

```javascript
//before requireSignin

router.post("/profile", (req, res) => {
  res.status(200).json({ user: "profile" });
});
// after requireSignin
router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: "profile" });
});
```

##### SO what is happening here is that, it tells that once the "requireSignin" function is executed:

`"/profile", requireSignin,`

##### this other one, the next() will follow:

- next() because you have it there in the auth.js /controller

```javascript
, (req, res) => {
  res.status(200).json({ user: "profile" });
});
```

<br>

##### GO TO the "postman" and now CLICK SEND

- YOU WILL HAVE THE SAME USER result

```javascript
{
    "user": "profile"
}
```

- But if the function really worked , you will have inside the server in the vs another message, the message : Bearer token

![rested](../img/bearer-token-result-server.jpg)

<br>
<br>

#### AFTER THAT GO TO THE auths.js /controller

###### VERIFY the token

```javascript
// -------------------------------------------
//
//           VERIFY A TOKEN
//
// -------------------------------------------
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split("")[1];
  // [1] is going to grab the token from the words "Bearer token"
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
```

##### GO TO THE POSTMAN and test it

- while you are in POST

- this is in the url: localhost:2000/api/profile

- there are 2 headers " Content-Type and Authorization"

- Click SEND

##### RESULT

### ERROR (jwt malformed)

![rested](../img/error_jwt_malformed1.jpg)

##### REASONS FOR THE ERROR

- in the tutorial he commited 2 errors

- instead of verify he put decoded i think

- also he forgot the .env

##### MY MISTAKES

- I FORGOT that i purged the user inside the atlas

- After i created a new user inside the postman again, i had the following result:

![rested](../img/new_user.jpg)

- Of course you must to change the url from signup to signin so to get the result above.

#### WHILE YOU ARE INSIDE THE POSTMAN

- copy the token that was provided in the result "check the image"

- type this url: localhost:200/api/signin

- click on Header and remove the "Authorization" field

- click on body and leave just this 2 fields:

```javascript
{
    "email": "neiran@domain.com",
    "password": "clfosnddud"
}
```

###### RESULT

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmEzMDliYzlmM2M2MjUyZWJhMDkyMDAiLCJpYXQiOjE2MDQ1MjE3MzksImV4cCI6MTYwNDUyNTMzOX0.yUX-PeoxhCbXv41zgGYGBiDkdMr0ZHz6KICxRTTeNkc",
    "user": {
        "_id": "5fa309bc9f3c6252eba09200",
        "firstName": "melinssa",
        "lastName": "neimra",
        "email": "neiran@domain.com",
        "role": "user",
        "fullName": "melinssa, neimra"
    }
}
```

##### NOW COPY THE TOKEN

- CREATE A NEW TAB inside the postman

- click on Headers

- type this url: localhost:200/api/profile

- POST method

- click on Headers and add a key field: Authorization

- add a value : Bearer

- inside the Bearer field paste the token code like so:

![rested](../img/fucking-verify_token.jpg)

- paste the token code

#### Big error (due to a stupid mistake)

- the split here has to have the space between the " " , if its like this "", it wont work and you will continue to have the "jwt malformed" error

```javascript
.split(" ")[1];
```

<br>

#### NOW IF YOU MODIFY the TOKEN like for example if you take 2 letters from the code, it will send an error like so:

- JsonWebTokenError: invalid signature

![rested](../img/token-error-invalid_signature.jpg)

<br>

#### ANYWAY... if all worked you will have this message:

```javascript
{
    "user": "profile"
}
```

<br>
<br>

## :cake::cake::cake::cake::cake: :cake:

### PROCESS

- Watch the video to follow the steps

[<img src="../img/result-token-user.jpg">](https://youtu.be/7OWrWcOikU0)
