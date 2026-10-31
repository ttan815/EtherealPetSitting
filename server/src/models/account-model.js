// Defines the account model database model.
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            required: true
        }
    },
    
    {timestamps: true}
);

const Account = mongoose.model("Account", accountSchema);

export default Account;