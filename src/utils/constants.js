// Application constants

export const API_CONFIG = {
    supabase: {
      url: process.env.REACT_APP_SUPABASE_URL,
      anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
    }
  };
  
  export const ORDER_STATUS = {
    PENDING: "Pending",
    ON_THE_WAY: "On The Way",
    DELIVERED: "Delivered"
  };
  
  export const ORDER_STATUS_OPTIONS = [
    { value: ORDER_STATUS.PENDING, label: "Pending", color: "#f59e0b" },
    { value: ORDER_STATUS.ON_THE_WAY, label: "On The Way", color: "#3b82f6" },
    { value: ORDER_STATUS.DELIVERED, label: "Delivered", color: "#10b981" }
  ];
  
  export const SEARCH_MODES = {
    FIRST: "first",
    FULL: "full"
  };
  
  export const PAGINATION = {
    ITEMS_PER_PAGE: 10,
    DEFAULT_PAGE: 1
  };
  
  export const DEBOUNCE_DELAY = {
    SEARCH: 400,
    FILTER: 300
  };
  
  export const TOAST_DURATION = {
    SHORT: 2000,
    NORMAL: 4000,
    LONG: 6000
  };
  
  export const STORAGE_KEYS = {
    THEME: "theme",
    ADMIN: "admin",
    TOKEN: "token"
  };
  
  export const ROUTES = {
    HOME: "/",
    DASHBOARD: "/dashboard",
    ORDERS: "/orders",
    ORDER_DETAILS: "/orders/:id",
    SETTINGS: "/settings",
    LOGIN: "/admin-login",
    REGISTER: "/admin-register"
  };
  
  export const ERROR_MESSAGES = {
    NETWORK: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    SERVER: "Server error. Please try again later.",
    VALIDATION: "Please check your input and try again."
  };
  
  export const SUCCESS_MESSAGES = {
    CREATE: "Successfully created!",
    UPDATE: "Successfully updated!",
    DELETE: "Successfully deleted!",
    LOGIN: "Welcome back!",
    LOGOUT: "Logged out successfully",
    REGISTER: "Account created successfully!"
  };
  
  export default {
    API_CONFIG,
    ORDER_STATUS,
    ORDER_STATUS_OPTIONS,
    SEARCH_MODES,
    PAGINATION,
    DEBOUNCE_DELAY,
    TOAST_DURATION,
    STORAGE_KEYS,
    ROUTES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
  };