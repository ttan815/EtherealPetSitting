const TEMP_AUTH_STORAGE_KEY = "petsitting.temp-auth-session";
let cachedTempUser = null;
const tempAuthListeners = new Set();

function notifyTempAuthListeners() {
    tempAuthListeners.forEach((listener) => listener());
}

export function subscribeToTempAuth(listener) {
    tempAuthListeners.add(listener);
    return () => tempAuthListeners.delete(listener);
}

const TEMP_LOGIN_ACCOUNTS = {
    "customer@customer.com": {
        password: "customer",
        route: "/customer-dashboard",
        name: "Customer Demo",
        role: "customer",
    },
    "owner@owner.com": {
        password: "owner",
        route: "/owner-dashboard",
        name: "Owner Demo",
        role: "owner",
    },
    "admin@admin.com": {
        password: "admin",
        route: "/employee-dashboard",
        name: "Admin Demo",
        role: "admin",
    },
};

// Temporary frontend-only login: validates demo credentials and saves the session locally.
export function loginWithTempAccount({ email, password }) {
    const normalizedEmail = email?.trim().toLowerCase();
    const account = TEMP_LOGIN_ACCOUNTS[normalizedEmail];
    if (!account || account.password !== password) {
        return { ok: false, status: 401, route: null, user: null };
    }

    const user = { email: normalizedEmail, name: account.name, role: account.role };
    localStorage.setItem(TEMP_AUTH_STORAGE_KEY, JSON.stringify(user));
    cachedTempUser = user;
    notifyTempAuthListeners();
    return { ok: true, status: 200, route: account.route, user };
}

// Temporary frontend-only session restore: reads the saved user without contacting the backend.
export function getTempAuthSession() {
    try {
        const savedSession = localStorage.getItem(TEMP_AUTH_STORAGE_KEY);
        if (!savedSession) {
            cachedTempUser = null;
            return null;
        }

        const user = JSON.parse(savedSession);
        cachedTempUser = user && TEMP_LOGIN_ACCOUNTS[user.email]?.role === user.role ? user : null;
        return cachedTempUser;
    } catch {
        localStorage.removeItem(TEMP_AUTH_STORAGE_KEY);
        cachedTempUser = null;
        return null;
    }
}

export function getCachedTempAuthSession() {
    return cachedTempUser;
}

// Temporary frontend-only logout: removes the saved demo session.
export function logoutTempAccount() {
    localStorage.removeItem(TEMP_AUTH_STORAGE_KEY);
    cachedTempUser = null;
    notifyTempAuthListeners();
}