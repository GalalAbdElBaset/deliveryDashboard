import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const statusConfig = {
  "Pending": { icon: FaClock, badgeClass: "badge-pending", label: "Pending" },
  "On The Way": { icon: FaTruck, badgeClass: "badge-on-the-way", label: "On The Way" },
  "Delivered": { icon: FaCheckCircle, badgeClass: "badge-delivered", label: "Delivered" },
  "Canceled": { icon: FaTimesCircle, badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", label: "Canceled" }
};

const OrderStatusBadge = ({ status, className = "" }) => {
  const config = statusConfig[status] || statusConfig["Pending"];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`badge ${config.badgeClass} ${className}`}
    >
      <Icon className="text-sm" />
      {config.label}
    </motion.span>
  );
};

export default OrderStatusBadge;