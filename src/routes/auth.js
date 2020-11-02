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
