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
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        hasAcceptTerm: {
            type: Boolean,
            required: true
        }
    },
    
    {timestamps: true}
);

const Account = mongoose.model("Account", accountSchema);

export default Account;