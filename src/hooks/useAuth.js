import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const admin = localStorage.getItem("admin");
      if (admin) {
        setUser(JSON.parse(admin));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const mockUser = { email, name: "Admin User" };
      localStorage.setItem("admin", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.message || "Login failed");
      return false;
    }
  };

  const register = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    
    try {
      const mockUser = { email, name: "Admin User" };
      localStorage.setItem("admin", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      toast.error(error.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };
};