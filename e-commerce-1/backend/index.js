const express = require("express");
const port = 4000;
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//database connection with mongoDB
const URI = "mongodb://127.0.0.1:27017/mern_ecommerce";
mongoose.connect(URI);

// API Creation
app.get("/" , (req, res) =>{
    res.send("Express App is Running");
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const  upload = multer({storage: storage});

// creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

//schema for creating products
const Product = mongoose.model("Product", {
    id: { type:Number, required: true },
    name: { type:String, required: true },
    image: { type:String, required: true },
    category: { type:String, required: true },
    new_price: { type:Number, required: true },
    old_price: { type:Number, required: true },
    date: { type:Date, default: Date.now },
    avilable: { type: Boolean, default: true },
});

app.post('/addproduct', async (req, res) => {

    let products = await Product.find({});
    let id;

    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }else{
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});


//Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log('removed');
    res.json({
        success: true,
        name: req.body.name
    });
});


//creating API for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})

//Schema creating for user model
const Users = mongoose.model('Users',{
    name: {type: String,},
    email: {type: String, unique: true,},
    password: {type: String,},
    cartData: {type: Object,},
    date: {type: Date, default: Date.now,},
})

//creating endpoint for registering the use
app.post("/signup", async (req, res) => {
    try {
        // Check if a user with the same email already exists
        const check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email address." });
        }

        // Initialize cart data
        const cart = new Array(300).fill(0); // Creates an array with 300 elements, all set to 0

        // Create a new user
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password, // Consider hashing the password for security
            cartData: cart,
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' }); // Add an expiration time for better security

        // Respond with success and the token
        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});

//creating user login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {id: user.id}
            }
            
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token});
        }else{
            res.json({success: false, errors: "Wrong Password"});
        }
    }else{
        res.json({success: false, errors: "wrong email id"});
    }
})

//creating endpoint for new collection data
app.get("/newcollection", async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection);
})

//creating endpoint for popular
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({category: "women"});
    let popular_in_women = products.slice(0, 4);
    console.log("popular in women clothes fetched");
    res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "please authenticate using valid token"})
    }else{
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "Please authenticate using a valid token"})
        }
    }

}

//creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id});
    console.log(userData)

})

app.listen(port, (error) => {
    if(!error){
        console.log(`Server running on port ${port}`);
    }else{
        console.error(error);
    }
});