import mongoose from "mongoose";
import Account from "../models/account-model.js";
import PersonalInfo from "../models/personal-info-model.js";
import hashPassword from "../utils/password-hash.js";
import checkPasswordRequirement from "../utils/check-password-requirement.js";
import { CUSTOMER_ROLE } from "../config/database-constant.js";
import checkInputFormat from "../utils/create-account-validation.js";
import loginAccount from "../controllers/login-account-controller.js"

/**
 * Create a New Account
 * 
 * @async
 * @function createAccount
 * @param {import ("express").Request} req - Express Incoming Request
 * @param {import ("express").Response} res - Express Server Response
 * @returns {Promise<void>} Response with a Success or an Error
 */
async function createAccount(req, res) {
    const session = await mongoose.startSession()
    try {
        await session.withTransaction(createAccountTransaction.bind(null, req));
    } catch (Error) {
        res.status(400).send({ Message: `${Error}` })
    } finally {
        await session.endSession();
    }
    return loginAccount(req, res, true, req.body.email, req.body.password)
}

/**
 * Saves Account and Personal Information in one Transaction
 * 
 * @async
 * @param {import("express").Request} req
 * @param {import("mongoose").ClientSession} session
 */
async function createAccountTransaction(req, session) {
    const accountData = await getAccountData(req.body);

    /* Create a New Account Entity */
    const newAccount = Account({
        email: accountData.email,
        password: accountData.hashedPassword,
        role: CUSTOMER_ROLE
    });
    await newAccount.save({ session });
    /* -------------------------- */

    /* Create a New Personal Information Entity */
    const newPersonalInfo = PersonalInfo({
        account_id: newAccount._id,
        first_name: accountData.firstName,
        last_name: accountData.lastName,
        phone_number: accountData.phoneNumber
    });
    await newPersonalInfo.save({ session });
    /* -------------------------- */
}

/**
 * Validate and Get Account Information
 * 
 * @async
 * @param {object} body
 * @returns {Promise<Object} Set of Account Information
 */
async function getAccountData(body = {}) {
    let { firstName, lastName, email, phoneNumber, password, retypedPassword, hasAcceptTerm } = body;

    /* Validation Section*/
    if (!hasAcceptTerm)
        throw new Error("Please Accept Terms and Condition!");
    await checkInputFormat(firstName, lastName, phoneNumber, email, password)
    await checkPasswordRequirement(password, retypedPassword);
    /* ---------------- */

    /* Reformat and Hash Password*/
    firstName = firstName.toLowerCase()
    lastName = lastName.toLowerCase()
    const hashedPassword = await hashPassword(password);
    return { firstName, lastName, email, phoneNumber, hashedPassword };
}

export default createAccount;