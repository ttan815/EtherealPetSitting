const express = require("express")
const createAccount = require("../controllers/create-account-controllers.js")
const router = express.Router();

router.post("/", createAccount)

module.exports = router;