import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log("Loading", loading);
    console.log("User", user);
    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/dashbord" />;

    return children;
};

export default ProtectedRoute;
