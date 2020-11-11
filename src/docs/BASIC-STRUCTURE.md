## LET'S GET STARTED 🌻

_THE FOLLOWING WILL BE THE BASIC STRUCTURE FOR THIS PROJECT_

- CREATE THE src folder
- inside of it , create the following folders:

```javascript
// THIS ARE THE FIRST FOLDERS WE WILL NEED
1 controller
2 models
3 routes
```

<br>

### INSIDE THE ROUTES folder

- create the user.js:

- import express and express.router

- create the ROUTES

```javascript
const express = require("express");
const router = express.Router();

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.get("/signin", (req, res, next) => {});

router.post("/signup", (req, res, next) => {});

module.exports = router;
```

<br>

### ABOUT THE MODULE EXPORTS

<br>

##### EXPORT

- You use the: the module.exports = router , to get the information out
  of this file, so to be shipped to the server.

  `(module.exports = router)`

##### IMPORT

- inside the "server" file you have to import the data from this file here,
  and you will do it like so:

`const userRoutes = require("./routes/user");`

<br>
<br>

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

<br>

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

- the SCHEMAS are the data structure for our collection

###### BUT BEFORE, check the DIFFERENCES of the exports

- Differences between the exports in ROUTES and MODELS

```javascript
// library / without this the export wont work
const router = express.Router();
// EXPORTS in Routes
module.exports = router;
//
// ----------------------------------------------
//
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
