const express = require("express");
const app = express();
const env = require("dotenv");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//

//
//
//
//
//---------------------
//  ENV CONFIG()
//---------------------
//environment variable or you can say constants
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
//
//
//
//---------------------
//   BODY PARSER
//---------------------
// ALWAYS add the BODY PARSER before the routes
//
app.use(express.json());

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(express.urlencoded({ extended: false }));

//
//
//
//
//
//
//---------------------
//  IMPORT the ROUTES
//---------------------
//
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
// categories
const categoryRoutes = require("./routes/category");
// product
const productRoutes = require("./routes/product");
//
// cart
const cartRoutes = require("./routes/cart");
//
//
//
//

//
//---------------------
//   USE the ROUTES
//---------------------

app.use("/api", authRoutes);
// the above is linked to this:
// const userRoutes = require("./routes/user");
//    A D M I N .. ROUTES
app.use("/api", adminRoutes);
//    C A T E G O R Y .. ROUTES
app.use("/api", categoryRoutes);
//    P R O D U C T .. ROUTES
app.use("/api", productRoutes);
//    C A R T .. ROUTES
app.use("/api", cartRoutes);
//
//
//
//
//----------------
//  PORT
//----------------
//
app.listen(process.env.PORT, () => {
  console.log(`server is running in PORT ${process.env.PORT}`);
});

/*








middleware: 

its the processor of the information 
you get for the ouside and the inside
// like when a user send a post request , 
the middleware will check the data of the user 
and send a response depending on that.



What does body parser do in Express?

body-parser extract the entire body portion of an incoming request 
stream and exposes it on req. body . The middleware was a part of Express. 
js earlier but now you have to install it separately. This body-parser module parses
 the JSON, buffer, string and URL encoded data submitted using HTTP POST request.





 
*/
