### ECOMMERCE2 :baby_chick:

##### REPEATING the ecommerce project i started 2 days ago

###### Here i am not going to explain the set up of the server, as i already did inside the ecommerce1:

[mern-ecommerce1](https://github.com/nadiamariduena/mongo-28-dci/tree/master/personal-lessons-tutorials/mern-ecommerce1)

- Since i am really new into databases with MERN, i wanted to see the random issues i could encounter when repeating the same steps.

<br>
<br>

#### ISSUE no.1

#### After setting up all like in the first "ecommerce1" test, i discovered that for some reason it didn't work, so i replaced all the files of the ecommerce2 with the files of the first ecommerce1 just to see if there was an error with the code, but it wasnt! So i figure it out that it was because of the database name which i didn't know i had to change.

- THE ERROR HAD to do with the name of the DATABASE i put inside the .env
  , since this is a new project i had to create a new database with of course a new name, like so:

  ![rested](./src/img/newdatabase.png)

```javascript
// BEFORE
MONGO_DB_DATABASE = mern - ecommerce - tutorial;
//
// AFTER
// inside the .env folder  , do this before start the app
MONGO_DB_DATABASE = tomatoes;
```

- Since i am after all starting another ecommerce app with the same info
  i should always change this, and of course for that i have to create a new database name inside the mongo atlas ,like so:

<br>
<br>
<br>

#### ISSUE no.2

###### I did a mistake with the second test as i didnt hide the .env correctly so i prefered to delete the whole repo. When adding the 3 repo, i got this ERROR.

![rested](./src/img/issue2_authentication.jpg)

<br>
<br>

- So i changed the port but the error persisted.

- Then i changed the password but the error persisted.

- Then i realized that the structure of the data in the ".env" wasnt like in the original ecommerce1 , because while changing the password i messed it a bit, so after i reorganize it, ichanged the password again inside the Atlas.

- Then i killed the server and restarted it again.

- It worked!

<br>
<br>
<br>

#### ISSUE no.3

- After you set up the POST and you go to the
  POSTMAN to test it, you will notice that it will not work
  when you will try to add the "document object" with data.

  - And that is because the data is not parsed

```javascript
/*
"document object"

{
     "firstName": "calogero",
    "lastName": "miumiu",
    "email": "hellocalo@domain.com",
    "password": "cloud"
}




*/

// POST
app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body, //req.body is because you are going to receive data from the outside like an input field in POSTMAN for example
  });
});
```

#### TO PARSE the data so that we can see what we do in POST:

- this way will work for now

```javascript
// How you parse the data
app.use(express.json());
```

- RESULT in POSTMAN:

![rested](./src/img/parseddata1-express.jpg)

##### INSTEAD of using express to Parse the data , we can use this BODY PARSER!

- install body parser

```javascript
// a BETTER way to parse json data
npm install --save body-parser
```

##### IMPORT it and USE it

```javascript
// IMPORT IT
const bodyParser = require("body-parser");
//
// USE IT
app.use(bodyParser());
/*

YOU WILL HAVE THE FOLLOWING MESSAGE

body-parser deprecated bodyParser: use individual json/urlencoded middlewares src/index.server.js:11:9
body-parser deprecated undefined extended: provide extended option node_modules/body-parser/index.js:105:29

*/
```

- DONT WORRY about for now!

<br>

#### What does body parser do in Express?

<br>

 <p> body-parser extract the entire body portion of an incoming request 
stream and exposes it on req. body . The middleware was a part of Express. 
js earlier but now you have to install it separately. This body-parser module parses
 the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
</p>

 </p>
 
<p>
middleware: its the processor of the information 
you get for the ouside and the inside
// like when a user send a post request , 
the middleware will check the data of the user 
and send a response depending on that.
</p>

<br>
<hr>
<br>
<br>

# INSTALL MONGO 🌱

- SINCE its the second time i repeat the tutorial, I already had the data base and
  i didnt have to repeat all the steps

- but i have a question, can i have two user names and 2 passwords for different prjects
  or do i have to use the same for all of them?

<br>
<br>

## MONGO DB CONNECTION 🍧

- replace this and add the STRING LINK here:

```javascript
//before
.connect("mongodb://localhost:27017/test"
// after
.connect("mongodb+srv://root:<password>@cluster0.ik0cr.mongodb.net/<dbname>?retryWrites=true&w=majority"
```

##### It should look like this:

```javascript
mongoose
  .connect(
    "mongodb+srv://root:<password>@cluster0.ik0cr.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ) //add this
  .then(() => {
    console.log("Database connected");
  });
```

##### Notice the root

- This root has to be added inside the .env file

```javascript
 .connect(
    "mongodb+srv://root:<password>

```

##### Like so

- all this information was added while creating the cluster, only the "ecommerce" isnt clear from where he is adding it, but i guess it s the database he is going to create, lets see.

```javascript
PORT = 2000;
// THE following 3 lines are connected to the cluster
MONGO_DB_USER = root;
MONGO_DB_PASSWORD = admin * 354;
MONGO_DB_DATABASE = ecommerce;
```

#####NOW add the user, password and database. REPLACE the following:

```javascript
- root:<password>
- cluster0.ik0cr.mongodb
- <dbname>?retryWrites

```

##### IT SHOULD LOOK LIKE THIS:

- DONT FORGET to add the template literals (``) to introduce the STRING LINK

```javascript
// MONGODB CONNECTION

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ik0cr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });
```

##### NOW TEST THE SERVER

- npm start

- You should have something like this:

```javascript
// RESULT ON THE CONSOLE
server is running on port 2000
Database connected


```

### CONGRATS!!! you have succesfully connected to the ATLAS 🌴

<br>
<br>
<hr>
<br>
<br>

#### CREATE THE SRC folder

- src folder
- inside of it , create:

```javascript
1 controller
2 models
3 routes
```

##### INSIDE of the ROUTES, create the user.js

- add the following:

```javascript
const express = require("express");
const router = express.Router();

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.get("/signin", (req, res, next) => {});

/* 



*/

router.post("/signup", (req, res, next) => {});

module.exports = router;
```

<br>
<br>

#### THE MODULE EXPORTS (module.exports = router)

<br>

###### EXPORT

- You use the: the module.exports = router , to get the information out
  of this file, so to be shipped to the server.

###### IMPORT

- inside the "server" file you have to import the data from this file here,
  and you will do it like so:

```javascript
// ROUTES
const userRoutes = require("./routes/user");
```

##### AFTER IMPORTING the ROUTES "user.js" data , you have to use it!

- START BY DELETING the following in the server.js:

```javascript
// GET
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello serverrr",
  });
});
// POST
app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body, //req.body is because you are going to receive data from the outside like an input field in POSTMAN for example
  });
});
```

##### REPLACE THE DELETED data with this:

```javascript
// middleware: its the processor of the information from both sides.
// like when a user send a post request , the middleware will check the data of the user and we send a response depending on that.
app.use("/api", userRoutes);
// the above is linked to this:
// const userRoutes = require("./routes/user");
```

<br>

##### NOW GO to the MODELS folder and create another user.js , this user.js is different and will serve to build the schemas

- the SCHEMAS are the data structure for out collection

###### BUT BEFORE, check the DIFFERENCES of the exports

- Differences between the exports in ROUTES and MODELS

```javascript
// library / without this the export wont work
const router = express.Router();
// EXPORTS in Routes
module.exports = router;
// library / without this the export wont work
const mongoose = require("mongoose");
//  EXPORTS in Models
module.exports = mongoose.model("User");
// after you filled the data below, the export will change
// as it has to take another argument together with the "User"
// it should look like this:
// mongoose.model("User", userSchema );
// But the User on itself represents the data inside the userSchema and is the User that will be exporting it.
```

#### the data inside the user.js "Models" FOLDER

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

### THE NEXT STEP will be to export the User from models to the user.js in ROUTES

```javascript
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

### THE ERROR HAD to do with the name of the DATABASE i put inside the .env

- Since i am after all starting another ecommerce app with the same info
  i should always change this and of course for that , i have to create a new database name
  inside the mongo atlas

```javascript
// inside the .env folder  , do this before start the app
MONGO_DB_DATABASE = tomatoes;
```

##### Now you can test in POSTMAN

![rested](./src/img/result_after_changing_DB.jpg)

- After you type the data on the top of the image, the result will be shown on the bottom.

- from the moment you do that, you cannot click SEND again as it will say that the data you are trying to enter already exists, that data is now stored here:

##### RESULT in ATLAS

![rested](./src/img/result-after-changing-db-name.png)

<br>
<br>
<br>

## GO TO the CONTROLLER folder

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

### EXPORT the controllers user.js DATA:

```javascript
exports.signup = (req, res) => {
```

<br>

### GO TO THE ROUTES / user.js

- IMPORT the content of the controllers like so:

- Since the exports.signup is a function, you must to import it in this way:

```javascript
// ROUTES folder : user.js
// you will export import the whole content of this file with this:
const { signup } = require("../controller/user");
// this will be added inside the routes
```

<br>

### THE user.js inside the ROUTES should look like this:

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

  ### THE TOKEN

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

![rested](./src/img/token_cookies.gif)

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

![rested](./src/img/signup_token.jpg)

<br>

#### NOW go to THE ATLAS and delete what you just created in the image above, as its SENSITIVE DATA.

![rested](./src/img/mongo_user_purge.jpg)

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

![rested](./src/img/authorization_bearertoken.jpg)

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

![rested](./src/img/bearer-token-result-server.jpg)

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

![rested](./src/img/error_jwt_malformed1.jpg)

##### REASONS FOR THE ERROR

- in the tutorial he commited 2 errors

- instead of verify he put decoded i think

- also he forgot the .env

##### MY MISTAKES

- I FORGOT that i purged the user inside the atlas

- After i created a new user inside the postman again, i had the following result:

![rested](./src/img/new_user.jpg)

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

![rested](./src/img/fucking-verify_token.jpg)

- paste the token code

#### Big error (due to a stupid mistake)

- the split here has to have the space between the " " , if its like this "", it wont work and you will continue to have the "jwt malformed" error

```javascript
.split(" ")[1];
```

<br>

#### NOW IF YOU MODIFY the TOKEN like for example if you take 2 letters from the code, it will send an error like so:

- JsonWebTokenError: invalid signature

![rested](./src/img/token-error-invalid_signature.jpg)

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

[<img src="./src/img/result-token-user.jpg">](https://youtu.be/7OWrWcOikU0)

<br>

<br>
<br>
<br>
<hr>
<br>
<br>

### :cat: THE ADMIN :cat:

<br>
<br>

#### CREATE AN ADMIN file inside the CONTROLLER folder

- CHECK THE VIDEO (click on the image) to follow the steps

- THE ERROR at the end of the video was due to a mistype in POSTMAN

[<img src="./src/img/adding-admin-folders.jpg">](https://www.youtube.com/watch?v=vDK_1GtjrhM)

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

[<img src="./src/img/result-new-admin-user.jpg">](https://www.youtube.com/watch?v=0PcpDYeEDF8)

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

![rested](./src/img/signin_admin_user.gif)

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

<br>
<hr>
<br>
<br>
<br>
<br>

# :golf: EXPRESS VALIDATOR :golf:

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
<br>
<hr>
<br>

## AFTER OBTAINING THE RESULT "change" THE FOLLOWING:

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
