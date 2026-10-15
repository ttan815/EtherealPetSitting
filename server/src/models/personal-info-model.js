import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema(
    {
        account_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        preferred_name: {
            type: String
        },
        phone_number: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String
        },
        emergency_number: {
            type: String
        }
    }
);

const PersonalInfo = mongoose.model("PersonalInfo",personalInfoSchema);

export default PersonalInfo;