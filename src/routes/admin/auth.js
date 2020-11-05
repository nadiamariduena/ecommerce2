const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");

const router = express.Router();

//
// the ROUTES are the box receiver of the MODELS data schemas
//
//
router.post("/admin/signup", signup);

router.post("/admin/signin", signin);

module.exports = router;
