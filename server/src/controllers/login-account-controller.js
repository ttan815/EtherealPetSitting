import mongoose from "mongoose";
import Account from "../models/account-model";
import { comparePassword } from "../utils/password-hash";

async function loginAccount(req, res, isCreateAccount = false, email = null, password = null) {
    if (!isCreateAccount) {
        // If we are logging in not using a created account, take user's username and password from res.
        ({ email, password } = req.body);
    }
    const isValidLoginInfo = await validateCredentials(email, password)
    if (!isValidLoginInfo) {
        return res.status(401).send({ Message: "Invalid email or Password." })
    }

}

async function validateCredentials(email, password) {
    if (email == null || password == null || email.length == 0 || password.length == 0) {
        return false
    }
    // Ensures inputs are parameters and not Keywords used for MongoDB Querying
    if (typeof email !== "string" || typeof password !== "string") {
        return false
    }
    const account = await Account.findOne({
        email: email.trim().toLowerCase()
    })
    if (!account) {
        return false
    }
    const isValid = await comparePassword(password, account.password)
    return isValid
}