import React from "react";
import { motion } from "framer-motion";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  icon,
  className = ""
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base",
    lg: "px-5 py-2.5 text-base md:px-6 md:py-3 md:text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 justify-center ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="text-base md:text-lg">{icon}</span>
      )}
      <span className="text-sm md:text-base">{children}</span>
    </motion.button>
  );
};

export default Button;