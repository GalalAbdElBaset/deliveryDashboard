import React, { useState, useEffect } from "react";

const initialFormState = {
  customerName: "",
  address: "",
  phone: "",
  price: "",
  status: "Pending"
};

const OrderForm = ({ onSubmit, editingOrder, cancelEdit }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingOrder) {
      setForm(editingOrder);
    } else {
      setForm(initialFormState);
    }
  }, [editingOrder]);

  const validate = () => {
    const newErrors = {};
    if (!form.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.price || isNaN(form.price) || form.price <= 0) newErrors.price = "Valid price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      if (!editingOrder) setForm(initialFormState);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Customer Name *</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              className={`form-input ${errors.customerName ? 'error' : ''}`}
            />
            {errors.customerName && <div className="error-message">{errors.customerName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Address *</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter delivery address"
              className={`form-input ${errors.address ? 'error' : ''}`}
            />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`form-input ${errors.phone ? 'error' : ''}`}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Price (EGP) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter order price"
              step="0.01"
              className={`form-input ${errors.price ? 'error' : ''}`}
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Pending">Pending</option>
              <option value="On The Way">On The Way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn-primary">
            {editingOrder ? "Update Order" : "Create Order"}
          </button>
          {editingOrder && (
            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;