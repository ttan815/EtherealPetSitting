const createAccountRoutes = require("./routes/create-account-routes.js");
const express = require("express");

const app = express();
const PORT = 5001

app.use("/api/create-account",createAccountRoutes)
app.listen(PORT, run);

function run() {
    console.log(`Server running on port: ${PORT}`);
}