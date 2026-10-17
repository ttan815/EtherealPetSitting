import mongoose from "mongoose";

async function loginAccount(res, req, isCreateAccount = false, email = null, password = null) {
    var email = null;
    var password = null;
    if (!isCreateAccount) {
        // If we are logging in not using a created account, take user's username and password from res.
        ({ email, password } = res.body());

    }
}

async function validateCredentials(email, password) {
    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(401).send({ Message: "Invalid Email or Password." })
    }

}