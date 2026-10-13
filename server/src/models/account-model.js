import mongoose from "mongoose";

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

const account = mongoose.model("Account", accountSchema);

module.exports = accountSchema;