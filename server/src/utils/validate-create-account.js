function validateAccount(req) {
    const { firstName, lastName, email, phoneNumber, password, hasAcceptTerm } = req.body;

    if(!hasAllField(firstName, lastName, email, phoneNumber, password, hasAcceptTerm))
        throw new Error("Missing Field!");

    return (firstName, lastName, email, phoneNumber, password, hasAcceptTerm);

}

/* Helper Function */
function hasAllField( firstName, lastName, email, phoneNumber, password, hasAcceptTerm) {
    return (
        firstName != null   &&
        lastName != null    &&
        email != null       &&
        phoneNumber != null &&
        password != null    &&
        hasAcceptTerm
    );
}

/* End of Helper Function*/
export default validateAccount;