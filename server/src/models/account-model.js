const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    
    {timestamps: true}
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;