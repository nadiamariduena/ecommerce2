# ERRORS 💀

- Since i am really new into databases with MERN, i wanted to see the random issues i could encounter when repeating the same steps.

<br>
<hr>
<br>

#### ISSUE no.1

#### After setting up all like in the first "ecommerce1" test, i discovered that for some reason it didn't work, so i replaced all the files of the ecommerce2 with the files of the first ecommerce1 just to see if there was an error with the code, but it wasnt! So i figure it out that it was because of the database name which i didn't know i had to change.

- THE ERROR HAD to do with the name of the DATABASE i put inside the .env
  , since this is a new project i had to create a new database with of course a new name, like so:

  ![rested](../img/newdatabase.png)

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
<hr>
<br>
#### ISSUE no.2

###### I did a mistake with the second test as i didnt hide the .env correctly so i prefered to delete the whole repo. When adding the 3 repo, i got this ERROR.

![rested](../img/issue2_authentication.jpg)

<br>
<br>

- So i changed the port but the error persisted.

- Then i changed the password but the error persisted.

- Then i realized that the structure of the data in the ".env" wasnt like in the original ecommerce1 , because while changing the password i messed it a bit, so after i reorganize it, ichanged the password again inside the Atlas.

- Then i killed the server and restarted it again.

- It worked!

<br>
<hr>
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

![rested](../img/parseddata1-express.jpg)

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
<br>

### 4

#### MONGO PRODUCT ERROR

- If you get this ERROR , its because you have this product record inside the database.

```javascript
{
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "slug": 1
        },
        "keyValue": {
            "slug": "Monstera-Deliciosa"
        }
    }
}
```

###### TO SOLVE IT:

- GO TO MONGO
- CHECK THE PRODUCTS
- DELETE THE SIMILAR PRODUCT OR CHANGE THE PRODUCTS NAME WHEN YOU ARE CREATING THE PRODUCT.

<br>
<br>
<br>

# COMMON QUESTIONS 🌻

### What is postman used for?

What is Postman? Postman is a popular API client that makes it easy for developers to create, share, test and document APIs. This is done by allowing users to create and save simple and complex HTTP/s requests, as well as read their responses. The result - more efficient and less tedious work

[POSTMAN website](https://www.postman.com/)

<br>
<hr>
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

## What is CRUD?

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
<hr>
<br>

## IMAGES UPLOADING RELATED 📷 🌻

<br>

#### File Upload With Multer in Node.js and Express

<p>When a web client uploads a file to a server, it is generally submitted through a form and encoded as multipart/form-data. Multer is middleware for Express and Node.js that makes it easy to handle this multipart/form-data when your users upload files. </p>

<p>In this tutorial, I'll show you how to use the Multer library to handle different file upload situations in Node.
</p>

#### How Does Multer Work?

<p>As I said above, Multer is Express middleware. Middleware is a piece of software that connects different applications or software components. In Express, middleware processes and transforms incoming requests to the server. In our case, Multer acts as a helper when uploading files.
</p>

##### Project Setup

<p>We will be using the Node Express framework for this project. Of course, you'll need to have Node installed. </p>

<br>

[FOLLOW THE STEPS IN THIS LINK](https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088)

<br>
<hr>
<br>

## THE DOLLAR symbol 💲 ???

<br>

##### WHY DO YOU USE THE DOLLAR symbol ?like so:

```javascript
//UPDATE the cart
Cart.findOneAndUpdate(
  { user: req.user._id },
  {
    //   Cart.findOneAndUpdate(); will find the cart from the user._id and update it
    //  to test if you can push an update write the following:
    $push: {
      cartItems: req.body.cartItems,
    },
  } //------- without this below, you cannot see the result in postman
).exec;
```

<br>

##### \$ (update)

- The positional \$ operator identifies an element in an array to update without explicitly specifying the position of the element in the array.

  > https://docs.mongodb.com/manual/reference/operator/update/positional/

- According to the docs, a "\$" is reserved for operators. If you look at the group operator however, values need to have a dollar prefixed. These values are not operators. What does it mean in this context then? Example below:

> https://stackoverflow.com/questions/16264647/what-does-a-dollar-sign-mean-in-mongodb-in-terms-of-groups/16266807
