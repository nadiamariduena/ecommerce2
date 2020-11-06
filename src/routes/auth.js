const express = require("express");
const { signup, signin } = require("../controller/auth");
const { validateRequest, isRequestValidated } = require("../validators/auth");

const router = express.Router();

//

//
router.post("/signup", validateRequest, isRequestValidated, signup);

router.post("/signin", signin);

module.exports = router;
