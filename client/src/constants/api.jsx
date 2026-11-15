// Where the backend lives. Set VITE_API_URL in client/.env to point somewhere
// else (e.g. the live server); otherwise the local dev server is used.
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5002/api";
export const LOGIN_ACCOUNT_URL = `${API_BASE_URL}/login-account`;
export const LOGIN_SESSION_URL = `${LOGIN_ACCOUNT_URL}/session`;
export const CREATE_ACCOUNT_URL = `${API_BASE_URL}/create-account`;

// Shown when a request fails for a reason that isn't the visitor's input
export const NETWORK_ERROR_MESSAGE = "Couldn't reach the server. Please try again.";
export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
