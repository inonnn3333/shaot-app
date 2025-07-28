import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    const login = useCallback((newToken, userInfo = null) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(userInfo);
        // localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userInfo));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }, []);

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
};

// זה כל מה שצריך בשביל להשתמש בקונטקסט
export const useAuthContext = () => useContext(AuthContext);
