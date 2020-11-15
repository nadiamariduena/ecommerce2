## 🔒 ADMIN USER 🔑

<!--

ADMINS TO USE for testing purposes

{
"firstName": "cheroki",
"lastName":  "bull",
    "email": "cheroki@domain.com",
    "password": "enolagay12354"

}

-->

_THE ADMIN WILL HAVE PRIVILEGES SUCH AS CREATING CATEGORIES AND SUBCATEGORIES FOR PRODUCTS_

<br>

##### CREATE AN ADMIN file inside the CONTROLLER folder

- CHECK THE VIDEO (click on the image) to follow the steps

- THE ERROR at the end of the video was due to a mistype in POSTMAN

<br>

[<img src="../img/adding-admin-folders.jpg">](https://www.youtube.com/watch?v=vDK_1GtjrhM)

<br>

##### RELATED TO THE ERROR AT THE END of the video:

```javascript
//     ****** SOLUTION *******
// instead of typing this:
localhost: 2000 / api / admin / signup;

// I typed this:
// error
localhost: 2000 / admin / signup;
```

<br>

- after i corrected it

<br>

[<img src="../img/result-new-admin-user.jpg">](https://www.youtube.com/watch?v=0PcpDYeEDF8)

<br>

- IF YOU NOTICE , the user admin is going to be created when you type this url:

```javascript
localhost: 2000 / api / admin / signup;
```

<br>

- If you were typing just

```javascript
localhost: 2000 / api / signup;
```

- it will only create a normal user

<br>
<br>

#### NOW TEST THE SIGNIN of the new admin user:

###### GOT TO THE POSTMAN AND TYPE THE FOLLOWING:

```javascript
{

    "email": "philosophym@domain.com",
    "password": "nabbxxxxla"
}
```

![rested](../img/signin_admin_user.gif)

<br><br>

### THE FOLLOWING is related to what you saw in the first video of the "adding the ADMIN"

<br>

#### CONTROLLER / ADMIN /auth.js

```javascript
// IMPORTS from the schema inside the MODELS
const User = require("../../models/user");
//  TOKEN related
const jwt = require("jsonwebtoken");
//
//
//
//        ****      A . D . M . I . N      ****
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
```

<br>
<br>

#### CONTROLLER / auth.js :bug:

###### HERE NOTHING REALLY CHANGES

```javascript
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

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  // so that i can access that user in the next function
  next();
  // jwt.verify();
  // with the above you decode the TOKEN
};
```

#### NOW GO TO THE ROUTES

- INSIDE OF THE ROUTES, CREATE THE ADMIN folder

- INSIDE THE ADMIN FOLDER , CREATE THE auth.js

- IT SHOULD look like this:

<br>

```javascript
const express = require("express");
const { signup, signin } = require("../../controller/admin/auth"); //NEW

const router = express.Router();

//
//        -----      A . D . M . I . N      ------
//
//
// the ROUTES are the box receiver for the schemas
//
//
router.post("/admin/signup", signup); //NEW

router.post("/admin/signin", signin); //NEW

module.exports = router;

//  HERE YOU DONT HAVE THE PROFILES ROUTE
```

<br>
<br>

#### NOW GO TO THE auth.js / ROUTER

```javascript
const express = require("express");
const { signup, signin } = require("../controller/auth");

const router = express.Router();

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.post("/signup", signup);

router.post("/signin", signin);

module.exports = router;

//const { signup, signin, requireSignin } = require("../controller/auth");

//     ****    HIDE THE PROFILE ****
//
// IT will serve as reference
//
// ONCE THE USER is logged in
// this will be  one of the protected routes he will be allowed to navigate
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
```

<br>
<br>

#### NOW GO TO THE index.server.js and add the routes connected to the "new admin USER"

```javascript
const express = require("express");
const app = express();
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//
// ROUTES
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth"); // **** NEW
//

env.config();
//
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ik0cr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Data base connnnnected :)");
  });

//

app.use(bodyParser());

app.use("/api", authRoutes);

//    A D M I N .. ROUTES  **** NEW
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running in PORT ${process.env.PORT}`);
});
```

<br>
<br>

## :construction: THE END OF USER AND ADMIN authentication , SIGNIN / SIGNUP :construction:
