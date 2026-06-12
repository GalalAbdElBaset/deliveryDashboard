import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false, 
  error,
  className = "" 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 appearance-none
            bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-blue-500"}
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;