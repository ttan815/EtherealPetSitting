import express from "express";
import loginAccount from "../controllers/login-account-controller"

const router = express.Router();

router.post("/", (req, res) => loginAccount(req, res)); // Only fills in parameters for req and res, rest is left to default values.

export default router;