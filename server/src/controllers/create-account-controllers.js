const Account = require("../models/account-model.js")

async function createAccount(req, res) {
    try {
        const { firstName, lastName } = req.body || {};
        console.log(firstName, lastName);
        const newAccount = Account({firstName,lastName})
        await newAccount.save();
        res.status(201).send({Message: "Received"});
    } catch (error) {
        console.log(error)
    }
}

module.exports = createAccount;