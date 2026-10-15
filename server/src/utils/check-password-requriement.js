import { REQUIRE_LENGTH } from "../config/password-policy.js";

function checkPasswordRequirement(password) {
    if (password.length < REQUIRE_LENGTH)
        throw new Error("Password Must be at least 8 Character Long!");
    else if (!hasSymbol(password))
        throw new Error("Password Must Contain at least 1 Symbol!");
    else if (!hasCapital(password))
        throw new Error("Password Must Contain at least 1 Capital Letter!");
    else if (!hasNumber(password))
        throw new Error("Password Must Contain at least 1 Number!");
}

/* Helper Function */
function hasSymbol(password) {
    const REGEX_SYMBOL = /[^A-Za-z0-9]/;
    return REGEX_SYMBOL.test(password);
}

function hasCapital(password) {
    const REGEX_CAPITAL = /[A-Z]/;
    return REGEX_CAPITAL.test(password);
}

function hasNumber(password) {
    const REGEX_NUMBER = /[0-9]/;
    return REGEX_NUMBER.test(password);
}

/* End of Helper Function*/
export default checkPasswordRequirement;