const express = require("express");
const app = express();
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//
// ROUTES
const userRoutes = require("./routes/user");
//
//  environment variable or you can say constants
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
// middleware: its the processor of the information you get for the ouside and the inside
// like when a user send a post request , the middleware will check the data of the user and send a response depending on that.
app.use("/api", userRoutes);
// the above is linked to this:
// const userRoutes = require("./routes/user");

app.listen(process.env.PORT, () => {
  console.log(`server is running in PORT ${process.env.PORT}`);
});
