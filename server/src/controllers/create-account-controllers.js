import Account from "../models/account-model.js";
import validateAccount from "../utils/validate-create-account.js";

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
        const { firstName, lastName, email, phoneNumber, password, hasAcceptTerm } = validateAccount(req);
        const newAccount = Account({firstName,lastName, email, phoneNumber, password, hasAcceptTerm})
        await newAccount.save();
        res.status(201).send({Message: "Received"});
    } catch (error) {
        res.status(400).send({Message: `${error}`})
    }
}

export default createAccount;