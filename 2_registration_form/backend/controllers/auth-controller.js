const Register = require("../models/register");

const home = async (req, res) => {
    
    try {
        console.log(req.body);
        const {fullname, age, email, city, pincode, phonenumber, occupation} = req.body;
        const userExist = await Register.findOne({email});
        if(userExist){
            return res.status(400).json({msg: "email already exists"});
        }
        const registerCreated = await Register.create({fullname, age, email, city, pincode, phonenumber, occupation});
        res.status(200).json({msg: registerCreated});
    } catch (error) {
        res.status(500).json("Interval Server Error");
    }
};

const showdata = async (req, res) => {
    try {
        const response = await Register.find();
        if (response.length === 0) {
            return res.status(404).json({ msg: "No user found" }); // Use `return` to ensure only one response is sent
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`error from backend userrecord ${error}`);
        res.status(500).json({ msg: "Internal Server Error" }); // Ensure error response is sent
    }
};


module.exports = {home, showdata};