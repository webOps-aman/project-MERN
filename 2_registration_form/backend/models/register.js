const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    fullname: {type: String, require: true},
    age: {type: Number, require: true},
    email: {type: String, require: true},
    city: {type: String, require: true},
    pincode: {type: Number, require: true},
    phonenumber: {type: Number, require: true},
    occupation: {type: String, require: true},
});

const Register = new mongoose.model("Register", registerSchema);
module.exports = Register;
