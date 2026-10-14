import bcrypt from "bcryptjs";
import { SALT_ROUND } from "../config/password-policy.js";

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

export default hashPassword;