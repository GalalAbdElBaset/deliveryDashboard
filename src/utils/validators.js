// Validation functions for the application

export const validators = {
    // Validate email format
    email: (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) return "Email is required";
      if (!regex.test(email)) return "Please enter a valid email address";
      return null;
    },
  
    // Validate password
    password: (password) => {
      if (!password) return "Password is required";
      if (password.length < 6) return "Password must be at least 6 characters";
      return null;
    },
  
    // Validate confirm password
    confirmPassword: (password, confirmPassword) => {
      if (!confirmPassword) return "Please confirm your password";
      if (password !== confirmPassword) return "Passwords do not match";
      return null;
    },
  
    // Validate customer name
    customerName: (name) => {
      if (!name || !name.trim()) return "Customer name is required";
      if (name.trim().length < 2) return "Name must be at least 2 characters";
      return null;
    },
  
    // Validate address
    address: (address) => {
      if (!address || !address.trim()) return "Address is required";
      if (address.trim().length < 5) return "Please enter a complete address";
      return null;
    },
  
    // Validate phone number
    phone: (phone) => {
      if (!phone || !phone.trim()) return "Phone number is required";
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
      return null;
    },
  
    // Validate price
    price: (price) => {
      if (!price) return "Price is required";
      const numPrice = parseFloat(price);
      if (isNaN(numPrice)) return "Price must be a number";
      if (numPrice <= 0) return "Price must be greater than 0";
      return null;
    },
  
    // Validate order status
    status: (status) => {
      const validStatuses = ["Pending", "On The Way", "Delivered"];
      if (!status) return "Status is required";
      if (!validStatuses.includes(status)) return "Invalid status";
      return null;
    }
  };
  
  // Form validation helper
  export const validateForm = (data, rules) => {
    const errors = {};
    for (const field in rules) {
      const error = rules[field](data[field]);
      if (error) errors[field] = error;
    }
    return errors;
  };
  
  export default validators;