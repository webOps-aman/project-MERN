const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");

router.route("/").post(authControllers.home);
router.route("/showdata").get(authControllers.showdata);

module.exports = router;