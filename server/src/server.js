const createAccountRoutes = require("./routes/create-account-routes.js");
const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(express.json());

app.use("/api/create-account",createAccountRoutes);
app.listen(PORT, run);

function run() {
    console.log(`Server running on port: ${PORT}`);
}