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


//const { signup, signin, requireSignin } = require("../controller/auth");

//
// ONCE THE USER is logged in
// this will be  one of the protected routes he will be allowed to navigate
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });

