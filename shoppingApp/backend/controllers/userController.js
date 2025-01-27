import userModel from "../models/userModel.js";


// route for user login
const loginUser = async (req, res) => {

}

// route for user registration
const registerUser = async (req, res) => {

    try {
        const {name, email, password} = req.body;

        //checking user already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: "User already exists"})
        }

        // validatiing email format & strong password
    } catch (error) {
        
    }

}


//route for admin login
const adminLogin = async (req, res) => {

}

export {loginUser, registerUser, adminLogin}