import React, { useState, useMemo } from "react";

const highlightText = (text, searchText) => {
  if (!searchText) return text;
  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} style={{ background: '#fef08a', color: '#1f2937', padding: '0 0.25rem', borderRadius: '0.25rem' }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const OrdersTable = ({ orders, onDelete, onEdit, onView, search, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return orders.slice(start, end);
  }, [orders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
        <p style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--gray-500)' }}>No orders found</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--gray-400)', marginTop: '0.5rem' }}>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table */}
      <div className="desktop-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: '500' }}>{highlightText(order.customerName, search)}</td>
                  <td>{order.phone}</td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.address}</td>
                  <td>
                    <span className={`badge badge-${order.status === 'Pending' ? 'pending' : order.status === 'On The Way' ? 'on-the-way' : 'delivered'}`}>
                      <i className={`fas ${order.status === 'Pending' ? 'fa-clock' : order.status === 'On The Way' ? 'fa-truck' : 'fa-check-circle'}`}></i>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>{order.price} EGP</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => onView(order.id)} className="btn btn-outline btn-sm" title="View">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button onClick={() => onEdit(order)} className="btn btn-secondary btn-sm" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => onDelete(order.id)} className="btn btn-danger btn-sm" title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div>
                <div className="order-card-name">{highlightText(order.customerName, search)}</div>
                <div className="order-card-phone"><i className="fas fa-phone"></i> {order.phone}</div>
              </div>
              <span className={`badge badge-${order.status === 'Pending' ? 'pending' : order.status === 'On The Way' ? 'on-the-way' : 'delivered'}`}>
                <i className={`fas ${order.status === 'Pending' ? 'fa-clock' : order.status === 'On The Way' ? 'fa-truck' : 'fa-check-circle'}`}></i>
                {order.status}
              </span>
            </div>
            <div className="order-card-body">
              <div className="order-card-address">
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)' }}></i>
                <span>{order.address}</span>
              </div>
              <div className="order-card-price">
                <i className="fas fa-dollar-sign" style={{ color: 'var(--success)' }}></i>
                {order.price} EGP
              </div>
            </div>
            <div className="order-card-actions">
              <button onClick={() => onView(order.id)} className="action-btn action-view">
                <i className="fas fa-eye"></i> View
              </button>
              <button onClick={() => onEdit(order)} className="action-btn action-edit">
                <i className="fas fa-edit"></i> Edit
              </button>
              <button onClick={() => onDelete(order.id)} className="action-btn action-delete">
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ padding: '0.5rem 1rem', color: 'var(--gray-700)' }}>
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;