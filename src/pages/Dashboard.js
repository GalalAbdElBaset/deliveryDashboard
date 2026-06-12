import React from "react";
import { useOrders } from "../hooks/useOrders";

const StatCard = ({ title, value, icon, colorClass }) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <i className={`fas ${icon} stat-card-icon`}></i>
      <div className="stat-card-title">{title}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
};

const Dashboard = () => {
  const { stats, loading } = useOrders();

  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <div className="skeleton" style={{ height: '2rem', width: '200px', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ height: '1rem', width: '300px' }}></div>
        </div>
        <div className="grid grid-cols-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {[1,2,3,4].map(i => (
            <div key={i} className="skeleton" style={{ height: '120px', borderRadius: '1rem' }}></div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Orders", value: stats?.total || 0, icon: "fa-box", colorClass: "" },
    { title: "Pending", value: stats?.pending || 0, icon: "fa-clock", colorClass: "yellow" },
    { title: "On The Way", value: stats?.onTheWay || 0, icon: "fa-truck", colorClass: "cyan" },
    { title: "Delivered", value: stats?.delivered || 0, icon: "fa-check-circle", colorClass: "green" }
  ];

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>
          Welcome back! Here's what's happening with your deliveries today.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recent Activity</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p>Total revenue: <strong style={{ color: 'var(--success)' }}>
            {stats?.total ? `$${(stats.total * 50).toLocaleString()}` : "$0"}
          </strong></p>
          <p>Completion rate: <strong style={{ color: 'var(--primary)' }}>
            {stats?.total ? Math.round((stats.delivered / stats.total) * 100) : 0}%
          </strong></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;