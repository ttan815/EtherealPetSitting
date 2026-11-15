import {
    CREATE_ACCOUNT_URL,
    GENERIC_ERROR_MESSAGE,
    LOGIN_ACCOUNT_URL,
    LOGIN_SESSION_URL,
} from "../../constants/shared/api";

async function readJson(response) {
    return response.headers.get("content-type")?.includes("application/json")
        ? response.json()
        : null;
}

/**
 * Fetches the currently authenticated user, or null when no session exists.
 * @returns {Promise<Object|null>} The session user.
 */
export async function getCurrentSession() {
    const response = await fetch(LOGIN_SESSION_URL, {
        method: "GET",
        credentials: "include",
    });
    return response.ok ? readJson(response) : null;
}

/**
 * Submits login credentials to the authentication API.
 * @param {{email: string, password: string, rememberMe: boolean}} credentials Login form values.
 * @returns {Promise<{ok: boolean, status: number, data: Object|null}>} The login response.
 */
export async function loginAccount(credentials) {
    const response = await fetch(LOGIN_ACCOUNT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
    });
    return {
        ok: response.ok,
        status: response.status,
        data: await readJson(response),
    };
}

/**
 * Creates a customer account through the account API.
 * @param {Object} form Account form values.
 * @param {string} [apiUrl] Account-creation endpoint override.
 * @returns {Promise<{ok: boolean, errors: Object, message: string, data: Object|null}>} The submission result.
 */
export async function createAccount(form, apiUrl = CREATE_ACCOUNT_URL) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
    });
    const data = await readJson(response);
    return {
        ok: response.ok,
        errors: data?.errors ?? {},
        message: data?.Message ?? (response.ok ? "" : GENERIC_ERROR_MESSAGE),
        data,
    };
}
