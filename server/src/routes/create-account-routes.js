import express from "express";
import createAccount from "../controllers/create-account-controllers.js"

const router = express.Router();

router.post("/", createAccount)

export default router;