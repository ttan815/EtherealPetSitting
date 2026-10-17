import bcrypt from "bcryptjs";
import { SALT_ROUND } from "../config/password-policy.js";

/**
 * Hash Password
 * 
 * @param {String} password
 * @returns {String} hash
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function comparePassword(password, accountHashedPassword) {
    const isEqual = await bcrypt.compare(password, accountHashedPassword)
    return isEqual
}
export default hashPassword;