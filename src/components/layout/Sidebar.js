import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const links = [
    { to: "/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    { to: "/orders", icon: "fas fa-boxes", label: "Orders" },
    { to: "/settings", icon: "fas fa-cog", label: "Settings" }
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <i className="fas fa-tachometer-alt"></i>
        </div>
        <p>Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <i className={link.icon}></i>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;