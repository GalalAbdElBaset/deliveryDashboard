import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, className = "", hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`card ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;