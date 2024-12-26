const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).send("Hello from router side");
});

router.route("/bmiuserdata").get((req, res) => {
    res.status(200).send("Hello, BMI user data from router side");
});

module.exports = router;