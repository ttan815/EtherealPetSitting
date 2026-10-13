async function createAccount(req, res) {
    try {
        const { firstName, lastName } = req.body || {};
        console.log(firstName, lastName);
        res.status(201).send({Message: "Received"});
    } catch (error) {
        console.log(error)
    }
}

module.exports = createAccount;