import mongoose from "mongoose";
import Account from "../models/account-model.js";
import PersonalInfo from "../models/personal-info-model.js";
import hashPassword from "../utils/password-hash.js";
import checkPasswordRequirement from "../utils/check-password-requriement.js";
import { CUSTOMER_ROLE } from "../config/database-constant.js";
import checkInputFormat from "../utils/create-account-validation.js";

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
        await session.withTransaction(saveAccount.bind(null, session,req))
        res.status(201).send({Message: "Account has Been Created!"});
    } catch (Error) {
        res.status(400).send({Message: `${Error}`})
    } finally {
        await session.endSession();
    }
    
}

async function retrieveUserInput(req) {
    let { firstName, lastName, email, phoneNumber, password, retypedPassword, hasAcceptTerm } = req.body || {};
    
    if(!hasAcceptTerm)
        throw new Error("Please Accept Terms and Condition!");
    await checkInputFormat(firstName, lastName, phoneNumber, email,password)
    await checkPasswordRequirement(password,retypedPassword);

    firstName = firstName.toLowerCase()
    lastName = lastName.toLowerCase()
    const hashedPassword = await hashPassword(password);
    return { firstName, lastName, email, phoneNumber, hashedPassword };
}

async function saveAccount(session, req) {
    const { firstName, lastName, email, phoneNumber, hashedPassword } = await retrieveUserInput(req);
    const newAccount = Account({
        email:email,
        password: hashedPassword,
        role: CUSTOMER_ROLE
    });
    
    await newAccount.save({session});

    const accountId = newAccount._id;
    const newPersonalInfo = PersonalInfo({
        account_id: accountId,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
    });

    await newPersonalInfo.save({session});
}

export default createAccount;