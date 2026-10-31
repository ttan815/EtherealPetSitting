// Provides helper functions for validate account.
import { hasPhoneFormat, hasOnlyLetter, hasEmailFormat } from "./reg-validator.js";
import validatePassword from "./validate-password.js";

/**
 * Validate Account
 * Checks every field and collects all problems at once, so the form can
 * show each message under its own field.
 * first-name: Required, Must Contain Only Letter
 * last-name: Required, Must Contain Only Letter
 * email: Required, Must be in this Format <you at example.com>
 * phone-number: Required, Must be a 10 Digit Number (any common format)
 * password / retyped-password: See validatePassword
 * has-accept-term: Must be Checked
 *
 * @param {Object} fields - Trimmed form values, keyed like the request body
 * @returns {Object} Error message per field, e.g. { email: "..." }. Empty if valid.
 */
function validateAccount(fields) {
    const { firstName, lastName, email, phoneNumber, password, retypedPassword, hasAcceptTerm } = fields;
    const errors = {};

    if (!firstName)
        errors.firstName = "Please enter your first name.";
    else if (!hasOnlyLetter(firstName))
        errors.firstName = "Use letters only.";

    if (!lastName)
        errors.lastName = "Please enter your last name.";
    else if (!hasOnlyLetter(lastName))
        errors.lastName = "Use letters only.";

    if (!email)
        errors.email = "Please enter your email address.";
    else if (!hasEmailFormat(email))
        errors.email = "Please enter a valid email address.";

    if (!phoneNumber)
        errors.phoneNumber = "Please enter your phone number.";
    else if (!hasPhoneFormat(phoneNumber))
        errors.phoneNumber = "Please enter a valid 10 digit phone number.";

    Object.assign(errors, validatePassword(password, retypedPassword));

    if (!hasAcceptTerm)
        errors.hasAcceptTerm = "Please agree to the Terms of Service and Privacy Policy.";

    return errors;
}

export default validateAccount;
