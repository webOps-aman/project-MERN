const home = async (req, res) => {
    try {
        res.status(200).send("Hello home, from controller side");
    } catch (error) {
        console.log(`Error From auth-controller home-side ${error}`);
    }
};

const bmiuserdata = async (req, res) => {
    try {
        res.status(200).send("Hello, BMI user data from controller side");
    } catch (error) {
        // console.log(`Error From auth-controller bmiuserdata-side ${error}`);
        res.status(400).send({msg: "Page Not Found"})
    }
};

module.exports = {home, bmiuserdata};