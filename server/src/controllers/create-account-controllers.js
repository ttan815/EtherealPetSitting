import Account from "../models/account-model.js";
import PersonalInfo from "../models/personal-info-model.js";
import hashPassword from "../utils/password-hash.js";
import checkPasswordRequirement from "../utils/check-password-requriement.js";
import { CUSTOMER_ROLE } from "../config/database-constant.js";

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
    try {
        const { firstName, lastName, email, phoneNumber, hashedPassword } = await retrieveUserInput(req);

        const newAccount = Account({
            email:email,
            password: hashedPassword,
            role: CUSTOMER_ROLE
        });
        await newAccount.save();

        const accountId = newAccount._id;
        const newPersonalInfo = PersonalInfo({
            account_id: accountId,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber
        });
        await newPersonalInfo.save();

        res.status(201).send({Message: "Account has Been Created!"});
    } catch (Error) {
        res.status(400).send({Message: `${Error}`})
    }
    
}

async function retrieveUserInput(req) {
    const { firstName, lastName, email, phoneNumber, password, retypedPassword, hasAcceptTerm } = req.body || {};
    if(!hasAcceptTerm)
        throw new Error("Please Accept Terms and Condition!");
    checkPasswordRequirement(password,retypedPassword);
    const hashedPassword = await hashPassword(password);
    return { firstName, lastName, email, phoneNumber, hashedPassword };
}

export default createAccount;