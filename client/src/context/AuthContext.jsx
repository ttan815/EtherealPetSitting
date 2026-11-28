// Provides shared auth context state to the React application.
import { createContext, useContext, useSyncExternalStore } from 'react'
import { getCachedTempAuthSession, getTempAuthSession, loginWithTempAccount, logoutTempAccount, subscribeToTempAuth } from "../services/auth/temp-auth-service";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
/**
 * Provides the current authentication session to descendant components.
 * @param {{children: import("react").ReactNode}} props - The provider's React children.
 * @returns {JSX.Element} The authentication context provider.
 */
export function AuthProvider({ children }) {
    const user = useSyncExternalStore(subscribeToTempAuth, getCachedTempAuthSession, () => null)
    const loading = false
    function loginTempAccount(credentials) {
        const result = loginWithTempAccount(credentials)
        return result
    }
    function refreshSession() {
        const savedUser = getTempAuthSession()
        return Boolean(savedUser)
    }
    function logout() {
        logoutTempAccount()
    }
    return (
        <AuthContext.Provider value={{ user, refreshSession, loginTempAccount, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
/**
 * Reads the current authentication context, including its user and session refresh function.
 * @returns {{user: Object|null, refreshSession: Function, loading: boolean}} The authentication context value.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);