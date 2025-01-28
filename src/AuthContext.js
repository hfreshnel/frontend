import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user data
    const [loading, setLoading] = useState(true); // Loading state for async actions

    // Simulated login function
    const login = (username, password) => {
        // Simulate an API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username && password) {
                    const mockUser = { id: 1, name: username, email: `${username}@example.com` };
                    setUser(mockUser);
                    localStorage.setItem("user", JSON.stringify(mockUser)); // Persist user data
                    resolve(mockUser);
                } else {
                    reject("Invalid credentials");
                }
            }, 1000);
        });
    };

    // Simulated logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Check if user is logged in when the app loads
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
