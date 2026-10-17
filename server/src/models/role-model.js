import mongoose, { Mongoose } from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        role_name: {
            type: String,
            require: true,
            unique: true
        }
    }
)

const Role = mongoose.model("Role", roleSchema)

export default Role;