const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {type: String, require: true},
    age: {type: String, require: true},
    weight: {type: String, require: true},
    height: {type: String, require: true},
    bmi: {type: String, require: true},
    bmiMessage: {type: String, require: true},
});

const User = new mongoose.model('Userrecord', userSchema);

module.exports = User;