import mongoose from "mongoose";
import Account from "../models/account-model.js";
import PersonalInfo from "../models/personal-info-model.js";
import hashPassword from "../utils/password-hash.js";
import { CUSTOMER_ROLE } from "../config/database-constant.js";
import validateAccount from "../utils/validate-account.js";
import { normalizePhoneNumber } from "../utils/reg-validator.js";
import loginAccount from "../controllers/login-account-controller.js"

/**
 * Create a New Account
 * Responds 400 with { errors: { field: message } } if any field is invalid,
 * otherwise saves the account and logs the visitor in.
 *
 * @async
 * @function createAccount
 * @param {import ("express").Request} req - Express Incoming Request
 * @param {import ("express").Response} res - Express Server Response
 * @returns {Promise<void>} Response with a Success or an Error
 */
async function createAccount(req, res) {
    const fields = getFormFields(req.body);

    /* Validation Section */
    const errors = validateAccount(fields);
    if (Object.keys(errors).length > 0)
        return res.status(400).send({ errors });
    /* ---------------- */

    const session = await mongoose.startSession()
    try {
        await session.withTransaction(createAccountTransaction.bind(null, fields));
    } catch (error) {
        // Duplicate email or phone number (unique fields in the models)
        if (error.code === 11000) {
            const duplicateErrors = error.keyPattern?.phone_number
                ? { phoneNumber: "This phone number is already registered." }
                : { email: "This email is already registered." };
            return res.status(400).send({ errors: duplicateErrors });
        }
        return res.status(500).send({ Message: "Something went wrong. Please try again." });
    } finally {
        await session.endSession();
    }
    return loginAccount(req, res, true, fields.email, fields.password)
}

/**
 * Read the Form Fields from the Request Body
 * Non-string values become "" so they fail validation instead of reaching MongoDB.
 *
 * @param {object} body
 * @returns {Object} Trimmed form values
 */
function getFormFields(body = {}) {
    const toTrimmedString = (value) => (typeof value === "string" ? value.trim() : "");
    return {
        firstName: toTrimmedString(body.firstName),
        lastName: toTrimmedString(body.lastName),
        email: toTrimmedString(body.email).toLowerCase(), // login looks emails up in lowercase
        phoneNumber: toTrimmedString(body.phoneNumber),
        password: typeof body.password === "string" ? body.password : "",
        retypedPassword: typeof body.retypedPassword === "string" ? body.retypedPassword : "",
        hasAcceptTerm: body.hasAcceptTerm === true
    };
}

/**
 * Saves Account and Personal Information in one Transaction
 *
 * @async
 * @param {Object} fields - Validated form values
 * @param {import("mongoose").ClientSession} session
 */
async function createAccountTransaction(fields, session) {
    const accountData = await getAccountData(fields);

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
 * Format Account Information for Saving
 *
 * @async
 * @param {Object} fields - Validated form values
 * @returns {Promise<Object>} Set of Account Information
 */
async function getAccountData(fields) {
    /* Reformat and Hash Password*/
    const firstName = fields.firstName.toLowerCase()
    const lastName = fields.lastName.toLowerCase()
    const phoneNumber = normalizePhoneNumber(fields.phoneNumber) // stored as (555)555-5555
    const hashedPassword = await hashPassword(fields.password);
    return { firstName, lastName, email: fields.email, phoneNumber, hashedPassword };
}

export default createAccount;
