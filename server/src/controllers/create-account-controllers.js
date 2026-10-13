function createAccount(req, res) {
    res.status(201).json({message:"Created Account!"})
}

module.exports = createAccount;