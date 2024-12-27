const User = require('../models/user-model');


const home = async (req, res) => {
    try {
        res.status(200).send("Hello home, from controller side");
    } catch (error) {
        console.log(`Error From auth-controller home-side ${error}`);
    }
};

const bmiuserdata = async (req, res) => {
    try {
        // console.log(req.body);
        // const data = req.body;
        const {fullName, age, weight, height, bmi, bmiMessage} = req.body;
        const userExit = await User.findOne({fullName});

        if(userExit){
            return res.status(400).json({msg: "User already Exists"});
        }

        const userCreated = await User.create({fullName, age, weight, height, bmi, bmiMessage});


        res.status(200).json({msg: userCreated});
    } catch (error) {
        res.status(500).json("Interval Server Error");
    }
};

module.exports = {home, bmiuserdata};