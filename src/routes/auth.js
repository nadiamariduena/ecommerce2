const express = require("express");
const { signup } = require("../controller/auth");
const router = express.Router();

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.post("/signup", signup);

router.post("/signin", (req, res, next) => {
  // the User with the SCHEMA data
});

module.exports = router;
