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
        res.status(200).json({message: req.body});
    } catch (error) {
        res.status(500).json("Interval Server Error");
    }
};

module.exports = {home, showdata};