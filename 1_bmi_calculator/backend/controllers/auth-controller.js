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


const userrecord = async (req, res) => {
    try {
        const response = await User.find();
        if(!response){
            res.status(404).json({msg: "No user found"});
        }
        res.status(200).json({msg: response});
    } catch (error) {
        console.log(`error from backend userrecord ${error}`);
    }
};

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await User.deleteOne({_id: id});
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log(`Error in deleteUserById: ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }
};

module.exports = {home, bmiuserdata, userrecord, deleteUserById};