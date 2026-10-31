// Provides shared auth context state to the React application.
import { createContext, useState, useContext, useEffect } from 'react'
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
            const response = await fetch("http://localhost:5002/api/login-account/session",
                {
                    method: "GET",
                    credentials: "include",
                })
            if (!response.ok) {
                setUser(null)
                return false
            }
            const userData = await response.json()
            setUser(userData)
            return true
        } catch (error) {
            setUser(null)
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