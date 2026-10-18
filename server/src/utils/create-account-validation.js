import { hasPhoneFormat, hasOnlyLetter, hasEmailFormat } from "./reg-validator.js";

/**
 * Check Input Format
 * first-name: Must Contain Only Letter
 * last-name: Must Contain Only Letter
 * phone-number: Must be in this Format (xxx)xxx-xxxx
 * email: Must be in this Format <you at example.com>
 * Password: Must not have Space
 * 
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} phoneNumber
 * @param {String} email
 * @param {String} password
 * @throws {Error} If Violate Any Format
 */
function checkInputFormat(firstName, lastName, phoneNumber, email, password) {
    if( typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof phoneNumber !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    )
        throw new Error("Please Fill all the Field!");

    if(!hasOnlyLetter(firstName))
        throw new Error("First Name Must Contain only Letter!");

    if(!hasOnlyLetter(lastName))
        throw new Error("Last Name Must Contain only Letter!");

    if(!hasEmailFormat(email))
        throw new Error("Invalid Email Address");

    if(!hasPhoneFormat(phoneNumber))
        throw new Error("Phone Number Must be in this Format (555)555-5555");
}
export default checkInputFormat;