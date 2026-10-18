import mongoose from "mongoose";
import Account from "../models/account-model.js";
import express from "express";
import { comparePassword } from "../utils/password-hash.js";

async function loginAccount(req = null, res = null, isCreateAccount = false, email = null, password = null) {
    try {
        if (!isCreateAccount) {
            // If we are logging in not using a created account, take user's username and password from req.
            ({ email, password } = req.body);
        }
        const account = await validateCredentials(email, password)
        if (!account) {
            return res.status(401).send({ Message: "Invalid email or Password." })
        }

        // Regenerate session on login to prevent session fixation, where hacker
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).send({ Message: "Failed to Create Session." })
            }
            req.session.userId = account._id.toString();
            if (req.body.rememberMe) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 // Set session to a day.
            }
            else {
                req.session.cookie.maxAge = null // Session expires on closing of browser.
            }
            res.session.save((err) => {
                if (err) {
                    return res.status(401).send({ Message: "Failed to Create Session." })
                }
                else {
                    return res.status(200).send({ Message: "Login Successful." })
                }
            })
        })
    }
    catch (error) {
        res.status(500).send({ Message: "Internal Server Error." })
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
    if (!isValid) {
        return false
    }
    return account
}

export default loginAccount;