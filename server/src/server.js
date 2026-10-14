import createAccountRoutes from "./routes/create-account-routes.js";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv"

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