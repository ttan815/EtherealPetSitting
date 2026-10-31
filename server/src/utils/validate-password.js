// Provides helper functions for validate password.
import { REQUIRE_LENGTH } from "../config/password-policy.js";
import { hasSymbol, hasCapital, hasNumber } from "./reg-validator.js";

/**
 * Validate Password:
 * Required Length
 * Must Contain Symbol
 * Must Contain Capital Letter
 * Must Contain Number
 * Must not Contain Space
 * Retyped Password Must Match
 *
 * @param {String} password
 * @param {String} retypedPassword
 * @returns {Object} Error message per field, e.g. { password: "..." }. Empty if valid.
 */
function validatePassword(password, retypedPassword) {
    const errors = {};

    if (!password)
        errors.password = "Please create a password.";
    else if (password.length < REQUIRE_LENGTH)
        errors.password = `Password must be at least ${REQUIRE_LENGTH} characters.`;
    else if (password.includes(" "))
        errors.password = "Password can't contain spaces.";
    else if (!hasCapital(password))
        errors.password = "Password must include a capital letter.";
    else if (!hasNumber(password))
        errors.password = "Password must include a number.";
    else if (!hasSymbol(password))
        errors.password = "Password must include a symbol.";

    if (!retypedPassword)
        errors.retypedPassword = "Please re-enter your password.";
    else if (password !== retypedPassword)
        errors.retypedPassword = "Passwords don't match.";

    return errors;
}

export default validatePassword;
