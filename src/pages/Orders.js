import React, { useState, useMemo } from "react";
import { useOrders } from "../hooks/useOrders";
import { useDebounce } from "../hooks/useDebounce";
import OrderForm from "../components/orders/OrderForm";
import OrdersTable from "../components/orders/OrdersTable";
import Modal from "../components/common/Modal";

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "a")
    .replace(/ا/g, "a")
    .replace(/ى/g, "a")
    .replace(/ة/g, "h")
    .trim();
};

const Orders = () => {
  const { orders, loading, addOrder, updateOrder, deleteOrder } = useOrders();
  const [editingOrder, setEditingOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchMode, setSearchMode] = useState("first");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  
  const debouncedSearch = useDebounce(search, 400);

  const handleDelete = async () => {
    if (orderToDelete) {
      await deleteOrder(orderToDelete);
      setDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const confirmDelete = (id) => {
    setOrderToDelete(id);
    setDeleteModalOpen(true);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const name = normalizeText(order.customer_name);
      const searchText = normalizeText(debouncedSearch);

      let nameMatch = true;
      if (searchText) {
        if (searchMode === "first") {
          nameMatch = name.startsWith(searchText);
        } else {
          nameMatch = name.includes(searchText);
        }
      }

      const statusMatch = statusFilter === "All" || order.status === statusFilter;
      return nameMatch && statusMatch;
    }).map(order => ({
      ...order,
      customerName: order.customer_name
    }));
  }, [orders, debouncedSearch, searchMode, statusFilter]);

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '2rem', width: '150px', marginBottom: '1rem' }}></div>
        <div className="skeleton" style={{ height: '300px', borderRadius: '1rem' }}></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Order Management
        </h1>
        <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Create, manage, and track all delivery orders</p>
      </div>

      <OrderForm
        onSubmit={async (order) => {
          let success;
          if (order.id) {
            success = await updateOrder(order.id, order);
          } else {
            success = await addOrder(order);
          }
          if (success) {
            setEditingOrder(null);
          }
        }}
        editingOrder={editingOrder}
        cancelEdit={() => setEditingOrder(null)}
      />

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }}></i>
              <input
                type="text"
                placeholder="Search by customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${searchMode === "first" ? "btn-primary" : "btn-secondary"} btn-sm`}
              onClick={() => setSearchMode("first")}
            >
              First Name
            </button>
            <button
              className={`btn ${searchMode === "full" ? "btn-primary" : "btn-secondary"} btn-sm`}
              onClick={() => setSearchMode("full")}
            >
              Full Name
            </button>
          </div>

          <div style={{ position: 'relative', minWidth: '140px' }}>
            <i className="fas fa-filter" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', zIndex: 1 }}></i>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ paddingLeft: '2.5rem', appearance: 'none', cursor: 'pointer' }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="On The Way">On The Way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          {debouncedSearch && (
            <button className="btn btn-secondary btn-sm" onClick={() => setSearch("")}>
              <i className="fas fa-times"></i> Clear
            </button>
          )}
        </div>

        <OrdersTable
          orders={filteredOrders}
          onDelete={confirmDelete}
          onEdit={setEditingOrder}
          onView={(id) => window.location.href = `/orders/${id}`}
          search={debouncedSearch}
        />
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Orders;