const express = require("express");
const app = express();
const port = 4000;
const connectDB = require("./utils/db");
const cors = require("cors");

// -----cors policy start here-----
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE, PATCH, PUT, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
// -----cors policy end here-----

app.use(express.json());

// -----auth-router page connect start here-----
const router = require("./router/auth-router");
app.use("/", router);
app.use("/showdata", router);
// -----auth-router page connect end here-----


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });
})


