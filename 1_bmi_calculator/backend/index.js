const express = require("express");
const app = express();
const port = 5000;
const connectDb = require('./utils/db');
const cors = require("cors");


// -----handling cors policy issue start here-----
const corsOptions = {
    origin: "http://localhost:3000",
    method: "GET, POST, DELETE, PUT, PATCH, HEAD",
    credentials: true
}
app.use(cors(corsOptions));
// -----handling cors policy issue end here-----

// -----middleware start here-----
app.use(express.json());
// -----middleware end here-----

const router = require("./router/auth-router");
const dataRoute = require('./router/auth-router');
app.use("/api/auth", router);
app.use("/api/data", dataRoute);


// -----db and server start here-----
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
// -----db and server end here-----