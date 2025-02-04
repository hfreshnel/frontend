import React, { createContext, useState, useEffect } from "react";
import { connectUser } from "./api/fetching";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user data
    const [loading, setLoading] = useState(true); // Loading state for async actions

    // Simulated login function
    const login = (username, password) => {
        return connectUser(username, password).then((user) => {
            console.log("user: ", user);
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
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
        <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
