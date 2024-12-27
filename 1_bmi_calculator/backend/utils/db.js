const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/bmi_calculator";

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful to DB");
    } catch (error) {
        console.error("Database Connection Failed");
        process.exit(0);
    }
};

module.exports = connectDb;

