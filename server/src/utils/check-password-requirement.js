import { REQUIRE_LENGTH } from "../config/password-policy.js";
import { hasSymbol, hasCapital, hasNumber } from "./reg-validator.js";

/**
 * Check Password Requirement:
 * Required Length
 * Must Contain Symbol
 * Must Contain Capital Letter
 * Must Contain Number
 * Must not Contain Space
 * 
 * @param {String} password
 * @param {String} retypedPassword
 * @returns {boolean}
 * @throws {Error} If Does not Meet the Requirement
 */
function checkPasswordRequirement(password,retypedPassword) {
    if (password.length < REQUIRE_LENGTH)
        throw new Error("Password Must be at least 8 Character Long!");
    else if (!hasSymbol(password))
        throw new Error("Password Must Contain at least 1 Symbol!");
    else if (!hasCapital(password))
        throw new Error("Password Must Contain at least 1 Capital Letter!");
    else if (!hasNumber(password))
        throw new Error("Password Must Contain at least 1 Number!");
    else if (password !== retypedPassword)
        throw new Error("Password Does Not Match!")
    else if(password.includes(" "))
        throw new Error("Password Must not have Space");
    else
        return true

}

export default checkPasswordRequirement;