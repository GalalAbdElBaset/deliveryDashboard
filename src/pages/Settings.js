import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Modal from "../components/common/Modal";
import toast from "react-hot-toast";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/admin-login");
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #2563eb, #1e40af)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Settings
        </h1>
        <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>
          Manage your account preferences and settings
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="fas fa-palette" style={{ color: 'white', fontSize: '1.25rem' }}></i>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Theme Preference</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: '1rem' }}>
              Choose between light and dark mode for your dashboard
            </p>
            <button onClick={toggleTheme} className="btn btn-primary">
              <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
              {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ border: '2px solid #fecaca' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(135deg, #ef4444, #dc2626)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="fas fa-sign-out-alt" style={{ color: 'white', fontSize: '1.25rem' }}></i>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Logout</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: '1rem' }}>
              Sign out of your account and end your session
            </p>
            <button onClick={() => setShowConfirm(true)} className="btn btn-danger">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access the dashboard."
        confirmText="Logout"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Settings;