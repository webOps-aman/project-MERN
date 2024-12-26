const express = require("express");
const app = express();
const port = 5000;

const router = require("./router/auth-router");
app.use("/api/auth", router);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});