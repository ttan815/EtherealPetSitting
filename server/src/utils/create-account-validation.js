import { hasPhoneFormat, hasOnlyLetter, hasEmailFormat } from "./reg-validator.js";

async function checkInputFormat(firstName, lastName, phoneNumber, email, password) {
    if(!hasOnlyLetter(firstName))
        throw new Error("First Name Must Contain only Letter!");

    if(!hasOnlyLetter(lastName))
        throw new Error("Last Name Must Contain only Letter!");

    if(!hasEmailFormat(email))
        throw new Error("Invalid Email Address");

    if(!hasPhoneFormat(phoneNumber))
        throw new Error("Phone Number Must be in this Format (555)555-5555");

    if(password.includes(" "))
        throw new Error("Password Must not have Space");
}
export default checkInputFormat;