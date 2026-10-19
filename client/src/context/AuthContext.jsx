import { createContext, useState, useContext, useEffect } from 'react'
const AuthContext = createContext()
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
export const useAuth = () => useContext(AuthContext);