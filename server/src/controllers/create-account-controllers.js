import Account from "../models/account-model.js";

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
        const newAccount = Account({firstName,lastName, email, phoneNumber, password, hasAcceptTerm})
        await newAccount.save();
        res.status(201).send({Message: "Received"});
    } catch (error) {
        console.log(error)
    }
}

export default createAccount;