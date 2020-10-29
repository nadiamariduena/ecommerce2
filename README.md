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

### Now you can test in POSTMAN
