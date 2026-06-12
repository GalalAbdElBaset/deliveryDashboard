import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import orderService from "../services/orderService";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateStatus } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    const result = await orderService.getOrderById(id);
  
    if (result.success) {
      setOrder(result.data);
    } else {
      toast.error(result.error);
    }
  
    setLoading(false);
  }, [id]);

useEffect(() => {
  fetchOrder();
}, [fetchOrder]);


  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    const success = await updateStatus(id, newStatus);
    if (success) {
      setOrder(prev => ({ ...prev, status: newStatus }));
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '2rem', width: '200px', marginBottom: '1rem' }}></div>
        <div className="card">
          <div className="skeleton" style={{ height: '1rem', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ height: '1rem', width: '80%', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ height: '1rem', width: '60%' }}></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Order Not Found</h2>
        <p style={{ marginBottom: '1.5rem' }}>The order you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
      <button className="btn btn-secondary" onClick={() => navigate("/orders")} style={{ marginBottom: '1.5rem' }}>
        <i className="fas fa-arrow-left"></i> Back to Orders
      </button>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{order.customer_name}</h1>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={`badge badge-${order.status === 'Pending' ? 'pending' : order.status === 'On The Way' ? 'on-the-way' : 'delivered'}`}>
                <i className={`fas ${order.status === 'Pending' ? 'fa-clock' : order.status === 'On The Way' ? 'fa-truck' : 'fa-check-circle'}`}></i>
                {order.status}
              </span>
            </div>
          </div>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="form-select"
            style={{ width: 'auto', minWidth: '140px' }}
          >
            <option value="Pending">Pending</option>
            <option value="On The Way">On The Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '0.75rem' }}>
            <i className="fas fa-map-marker-alt" style={{ color: '#3b82f6', fontSize: '1.25rem' }}></i>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Address</div>
              <div style={{ fontWeight: '500' }}>{order.address}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '0.75rem' }}>
            <i className="fas fa-phone" style={{ color: '#3b82f6', fontSize: '1.25rem' }}></i>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Phone</div>
              <div style={{ fontWeight: '500' }}>{order.phone}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '0.75rem' }}>
            <i className="fas fa-dollar-sign" style={{ color: '#10b981', fontSize: '1.25rem' }}></i>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Price</div>
              <div style={{ fontWeight: '500' }}>{order.price} EGP</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: '0.75rem' }}>
            <i className="fas fa-calendar-alt" style={{ color: '#3b82f6', fontSize: '1.25rem' }}></i>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Created</div>
              <div style={{ fontWeight: '500' }}>{new Date(order.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;