// Where the backend lives. Set VITE_API_URL in client/.env to point somewhere
// else (e.g. the live server); otherwise the local dev server is used.
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5002/api";

// Shown when a request fails for a reason that isn't the visitor's input
export const NETWORK_ERROR_MESSAGE = "Couldn't reach the server. Please try again.";
export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
