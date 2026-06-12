import { useState, useEffect, useCallback } from "react";
import orderService from "../services/orderService";
import toast from "react-hot-toast";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const result = await orderService.getAllOrders();
    if (result.success) {
      setOrders(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }, []);

  const fetchStats = useCallback(async () => {
    const result = await orderService.getOrderStats();
    if (result.success) {
      setStats(result.data);
    }
  }, []);

  const addOrder = async (orderData) => {
    const result = await orderService.createOrder(orderData);
    if (result.success) {
      toast.success("Order created successfully!");
      await fetchOrders();
      await fetchStats();
      return true;
    } else {
      toast.error(result.error);
      return false;
    }
  };

  const updateOrder = async (id, orderData) => {
    const result = await orderService.updateOrder(id, orderData);
    if (result.success) {
      toast.success("Order updated successfully!");
      await fetchOrders();
      await fetchStats();
      return true;
    } else {
      toast.error(result.error);
      return false;
    }
  };

  const updateStatus = async (id, status) => {
    const result = await orderService.updateOrderStatus(id, status);
    if (result.success) {
      toast.success(`Status updated to ${status}`);
      await fetchOrders();
      await fetchStats();
      return true;
    } else {
      toast.error(result.error);
      return false;
    }
  };

  const deleteOrder = async (id) => {
    const result = await orderService.deleteOrder(id);
    if (result.success) {
      toast.success("Order deleted successfully!");
      await fetchOrders();
      await fetchStats();
      return true;
    } else {
      toast.error(result.error);
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [fetchOrders, fetchStats]);

  return {
    orders,
    loading,
    error,
    stats,
    addOrder,
    updateOrder,
    updateStatus,
    deleteOrder,
    refetch: fetchOrders
  };
};