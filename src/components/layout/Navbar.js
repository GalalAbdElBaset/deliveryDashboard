import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo-icon">
            <i className="fas fa-truck-fast"></i>
          </div>
          <span className="logo-text">Delivery Dashboard</span>
        </div>
        <div className="navbar-buttons">
          <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
            <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;