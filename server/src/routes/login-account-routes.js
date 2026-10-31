// Registers the login account routes API endpoints.
import express from "express";
import loginAccount, { getLoginSession } from "../controllers/login-account-controller.js"
import { rateLimit } from "express-rate-limit"
const router = express.Router();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 10 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    message: {
        Message: "Too many login attempts. Please try again later."
    }
})
router.post("/", limiter, (req, res) => loginAccount(req, res)); // Only fills in parameters for req and res, rest is left to default values.
router.get("/session", getLoginSession)

export default router;