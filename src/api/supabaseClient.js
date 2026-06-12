import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Error handler
export const handleSupabaseError = (error) => {
  console.error("Supabase Error:", error);
  
  const errorMap = {
    "PGRST116": "No data found",
    "23505": "Duplicate entry found",
    "42P01": "Table not found",
    "42501": "Permission denied"
  };
  
  if (error.message) return error.message;
  if (error.code && errorMap[error.code]) return errorMap[error.code];
  
  return "An unexpected error occurred. Please try again.";
};

// Admin API for authentication
export const adminAPI = {
  login: async (email, password) => {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Invalid email or password");
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  },

  checkEmail: async (email) => {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("email")
        .eq("email", email);
      
      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  },

  register: async (email, password) => {
    try {
      const { data, error } = await supabase
        .from("admins")
        .insert([{
          email: email,
          password: password,
          role: "admin",
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  }
};

// Orders CRUD operations
export const ordersAPI = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  },

  getById: async (id) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  },

  create: async (order) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([{
          customer_name: order.customerName,
          address: order.address,
          phone: order.phone,
          price: parseFloat(order.price),
          status: order.status || "Pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  },

  update: async (id, order) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          customer_name: order.customerName,
          address: order.address,
          phone: order.phone,
          price: parseFloat(order.price),
          status: order.status,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  },

  updateStatus: async (id, status) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  }
};

export default supabase;