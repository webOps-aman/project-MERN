const express = require("express");
const router = express.Router();


const authControllers = require("../controllers/auth-controller");

router.route("/").get(authControllers.home);
router.route("/bmiuserdata").post(authControllers.bmiuserdata);
router.route("/userrecord").get(authControllers.userrecord);
router.route("/delete/:id").delete(authControllers.deleteUserById);


module.exports = router;