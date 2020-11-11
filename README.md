# ECOMMERCE2 :shopping_cart:

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

# COMMON QUESTIONS

#### What is CRUD?

##### Create, Read, Update, and Delete (CRUD) are the four basic functions that models should be able to do, at most.

<p>

When we are building APIs, we want our models to provide
four basic types of functionality. The model must be able
to Create, Read, Update, and Delete resources. Computer
scientists often refer to these functions by the acronym
CRUD. A model should have the ability to perform at most
these four functions in order to be complete. If an action
cannot be described by one of these four operations, then
it should potentially be a model of its own.

</p>

[what-is-crud ? by CODEACADEMY](https://www.codecademy.com/articles/what-is-crud)

<br>
<br>

## LET'S START IT 🍨

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

<br>
<br>
<br>
<br>

## USER SCHEMA AND AUTHENTICATION 😎 

*FIRST WE WILL START BY STRUCTURING THE USER SCHEMA AND FROM THERE WE WILL SET UP THEN THE USER AUTHENTICATION.*
<br>

#### CLICK ON THE LINK to unfold the description

[USER AUTHENTICATION PROCESS](src/docs/PRODUCTS.md)

<br>
<hr>
<br>


## 🔒  ADMIN AUTHENTICATION 🔑 

*THE ADMIN WILL HAVE PRIVILEGES SUCH AS CREATING CATEGORIES AND SUBCATEGORIES FOR PRODUCTS*
<br>

##### CLICK ON THE LINK to unfold the description

[ADMIN AUTH PROCESS](src/docs/VALIDATORS.md)

<br>
<hr>
<br>

## :golf: EXPRESS VALIDATOR :golf:

#### What is express validator?

- Express Validator is an Express middleware library that you can incorporate in your apps for server-side data validation.

  <br>

- Express Validator is a set of Express. js middleware that wraps validator. js , a library that provides validator and sanitizer functions.

##### CLICK ON THE LINK to unfold the description

[VALIDATORS PROCESS](src/docs/VALIDATORS.md)

<br>
<hr>
<br>

## CATEGORY 🌻

<p>FIRST WE WILL START WITH THE CATEGORY , THEN WITH THE SUBCATEGORIES AND THEN THE BRANCHES NESTED INSIDE THE SUBCATEGORIES </p>


##### CLICK ON THE LINK to unfold the description

[CATEGORY PROCESS](src/docs/CATEGORY.md)

<br>
<hr>
<br>

## A D M I N - C A T E G O R Y  :closed_lock_with_key:


##### CLICK ON THE LINK to unfold the description

[ADMIN CATEGORY PROCESS](src/docs/ADMIN_CATEGORY.md)


<br>
<hr>
<br>



## SUB-CATEGORIES 

#### CLICK ON THE LINK to unfold the description

[SUBCATEGORIES PROCESS](src/docs/SUBCATEGORIES.md)

<br>
<hr>
<br>


## PRODUCTS :shopping:

#### CLICK ON THE LINK to unfold the description

[PRODUCTS PROCESS](src/docs/PRODUCTS.md)
