"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import { useRouter } from "next/navigation";
import { authService, getAccessToken, clearTokens } from "../api/api";

// ================= AUTH CONTEXT =================

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // ================= LOAD USER =================

    useEffect(() => {
        const loadUser = async () => {
            const token = getAccessToken();

            if (token) {
                try {
                    const userData = await authService.getUserMe();
                    setUser(userData);
                } catch (err) {
                    console.error("Session expired:", err);

                    clearTokens();
                    setUser(null);
                }
            }

            setLoading(false);
        };

        loadUser();
    }, []);

    // ================= LOGIN =================

    const login = async (username, password, isFromAdminPortal = false) => {
        try {
            // Login + save tokens
            await authService.login(username, password);

            // Fetch logged user
            const userData = await authService.getUserMe();

            setUser(userData);

            // Redirect based on role and login origin
            if (userData.role === "admin" && isFromAdminPortal) {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(err);

            let errorMsg = "Invalid credentials";
            if (err.response?.data) {
                if (err.response.data.detail) {
                    errorMsg = err.response.data.detail;
                } else if (typeof err.response.data === 'object') {
                    // Extract first available error message
                    const firstKey = Object.keys(err.response.data)[0];
                    const firstError = err.response.data[firstKey];
                    errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
                }
            }

            throw new Error(errorMsg);
        }
    };

    // ================= REGISTER =================

    const register = async (name, email, password) => {
        try {
            await authService.register(name, email, password);

            // Auto login after register
            await login(email, password);
        } catch (err) {
            console.error(err);

            let errorMsg = "Registration failed";
            if (err.response?.data) {
                if (err.response.data.detail) {
                    errorMsg = err.response.data.detail;
                } else if (typeof err.response.data === 'object') {
                    // Extract first available error message
                    const firstKey = Object.keys(err.response.data)[0];
                    const firstError = err.response.data[firstKey];
                    errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
                }
            }

            throw new Error(errorMsg);
        }
    };

    // ================= LOGOUT =================

    const logout = () => {
        authService.logout();
        
        router.push("/");
        
        // Delay clearing the user state slightly to allow the router
        // to navigate to the home page before the ProtectedRoute wrapper
        // detects the unauthenticated state and forces a redirect to /login.
        setTimeout(() => {
            setUser(null);
        }, 100);
    };

    // ================= CONTEXT VALUE =================

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// ================= PROTECTED ROUTE =================

export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
}