// Where the backend lives. Set VITE_API_URL in client/.env to point somewhere
// else (e.g. the live server); otherwise the local dev server is used.
/** @type {string} Base URL for the backend API. */
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5002/api";
/** @type {string} Login endpoint URL. */
export const LOGIN_ACCOUNT_URL = `${API_BASE_URL}/login-account`;
/** @type {string} Current-session endpoint URL. */
export const LOGIN_SESSION_URL = `${LOGIN_ACCOUNT_URL}/session`;
/** @type {string} Account-creation endpoint URL. */
export const CREATE_ACCOUNT_URL = `${API_BASE_URL}/create-account`;

// Shown when a request fails for a reason that isn't the visitor's input
/** @type {string} User-facing message when the server cannot be reached. */
export const NETWORK_ERROR_MESSAGE = "Couldn't reach the server. Please try again.";
/** @type {string} Generic user-facing message for unexpected request failures. */
export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
