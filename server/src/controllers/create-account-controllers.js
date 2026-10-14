import Account from "../models/account-model.js";

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