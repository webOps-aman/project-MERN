const express = require("express");
const router = express.Router();

// const {home, bmiuserdata} = require("../controllers/auth-controller");
const authControllers = require("../controllers/auth-controller");

router.route("/").get(authControllers.home);
router.route("/bmiuserdata").get(authControllers.bmiuserdata);

module.exports = router;