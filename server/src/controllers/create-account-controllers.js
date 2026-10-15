import Account from "../models/account-model.js";
import hashPassword from "../utils/password-hash.js";
import checkPasswordRequirement from "../utils/check-password-requriement.js";

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
        const { firstName, lastName, email, phoneNumber, password, hasAcceptTerm } = req.body || {};
        checkPasswordRequirement(password);
        const hashedPassword = await hashPassword(password);
        const newAccount = Account({
            firstName:firstName,
            lastName: lastName, 
            email:email, 
            phoneNumber: phoneNumber, 
            password: hashedPassword, 
            hasAcceptTerm: hasAcceptTerm
        });
        await newAccount.save();
        res.status(201).send({Message: "Account has Been Created!"});
    } catch (Error) {
        res.status(400).send({Message: `${Error}`})
    }
    
}

export default createAccount;