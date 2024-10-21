import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();
    const isAuthPath = location.pathname.includes("/login") || location.pathname.includes("/register");
    const isAdminPath = location.pathname.includes("admin");
    const isShopPath = location.pathname.includes("shop");

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />
        }
        else {
            return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shopping/home"} />;
        }
    }

    if (!isAuthenticated && !isAuthPath) {
        return <Navigate to="/auth/login" />;
    }

    if (isAuthenticated && isAuthPath) {
        return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shopping/home"} />;
    }

    if (isAuthenticated && user?.role !== "admin" && isAdminPath) {
        return <Navigate to="/unauthorized" />;
    }

    if (isAuthenticated && user?.role === "admin" && isShopPath) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
};

export default CheckAuth;
