import mongoose from "mongoose";
import Account from "../models/account-model.js";
import PersonalInfo from "../models/personal-info-model.js";
import express from "express";
import { SUPER_ADMIN_ROLE, ADMIN_ROLE, CUSTOMER_ROLE } from "../config/database-constant.js";
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
            if (!isCreateAccount && req.body.rememberMe) {
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24 // Set session to a day.
            }
            else {
                req.session.cookie.maxAge = null // Session expires on closing of browser.
            }
            req.session.save((err) => {
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
    // Ensures inputs are parameters and not Keywords used for MongoDB Querying
    if (typeof email !== "string" || typeof password !== "string") {
        return false
    }
    if (email == null || password == null || email.length == 0 || password.length == 0) {
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

export async function getLoginSession(req, res) {
    try {
        if (!req.session.userId) {
            return res.status(401).send({ Message: "Invalid Session" })
        }
        const account = await Account.findById(
            req.session.userId
        ).select("email role")
        if (!account) {
            return res.status(401).send({ Message: "Invalid Session" })
        }
        const personalInfo = await PersonalInfo.findOne({
            account_id: account._id
        })
        if (!personalInfo) {
            return res.status(401).send({ Message: "Invalid Session" })
        }
        const dict_roles = {
            [SUPER_ADMIN_ROLE]: "super_admin",
            [ADMIN_ROLE]: "admin",
            [CUSTOMER_ROLE]: "customer"
        };

        const personalInfoObj = {
            email: account.email,
            firstName: personalInfo.first_name,
            lastName: personalInfo.last_name,
            preferredName: personalInfo.preferred_name,
            phoneNumber: personalInfo.phone_number,
            address: personalInfo.address,
            emergencyNumber: personalInfo.emergency_number,
            role: dict_roles[account.role]
        }
        return res.status(200).json(personalInfoObj)
    } catch (error) {
        return res.status(500).send({ Message: "Internal Server Error." })
    }
}

export default loginAccount;