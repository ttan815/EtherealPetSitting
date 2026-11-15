// Provides shared auth context state to the React application.
import { createContext, useState, useContext, useEffect } from 'react'
import { getCurrentSession } from "../services/auth-service";
const AuthContext = createContext()
/**
 * Provides the current authentication session to descendant components.
 * @param {{children: import("react").ReactNode}} props - The provider's React children.
 * @returns {JSX.Element} The authentication context provider.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // Makes it where only after the query is done will the component display user related info.
    useEffect(() => {
        refreshSession()
    }, [])
    async function refreshSession() {
        try {
            setLoading(true)
            const userData = await getCurrentSession();
            if (!userData) {
                setUser(null)
                return false
            }
            setUser(userData)
            return true
        } catch (error) {
            setUser(null)
            console.error("Unable to refresh the authentication session.", error)
            return false
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{ user, refreshSession, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
/**
 * Reads the current authentication context, including its user and session refresh function.
 * @returns {{user: Object|null, refreshSession: Function, loading: boolean}} The authentication context value.
 */
export const useAuth = () => useContext(AuthContext);