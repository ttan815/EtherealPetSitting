// Configures and starts the Express API server.
import createAccountRoutes from "./routes/create-account-routes.js";
import loginAccountRoutes from "./routes/login-account-routes.js";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors" // Remove this later, For testing
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

// Remove this Later, For Testing
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Tells the browser to include cookies when making a request.
  })
);
// -------

app.use(express.json());

// Configure the session
app.use(session({
  name: "session_id",
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Change .env to be production once finished with testing.
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // Sets session length for a day
  }
}))
app.use("/api/create-account", createAccountRoutes);
app.use("/api/login-account", loginAccountRoutes)
app.listen(PORT, run);

function run() {
  console.log(`Server running on port: ${PORT}`);
}