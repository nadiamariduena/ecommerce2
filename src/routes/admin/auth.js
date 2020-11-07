const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest
} = require("../../validators/auth");
const router = express.Router();

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

module.exports = router;
