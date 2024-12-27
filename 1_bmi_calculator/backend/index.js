const express = require("express");
const app = express();
const port = 5000;
const connectDb = require('./utils/db');

// -----middleware start here-----
app.use(express.json());
// -----middleware end here-----

const router = require("./router/auth-router");
app.use("/api/auth", router);




connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});