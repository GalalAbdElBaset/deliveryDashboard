import { supabase, handleSupabaseError } from "../api/supabaseClient";

class AuthService {
  async login(email, password) {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Invalid email or password");
      
      // Don't store password in localStorage
      const { password: _, ...safeAdmin } = data;
      localStorage.setItem("admin", JSON.stringify(safeAdmin));
      
      return { success: true, data: safeAdmin };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  }

  async register(email, password) {
    try {
      // Check if email exists
      const { data: existing } = await supabase
        .from("admins")
        .select("email")
        .eq("email", email);
      
      if (existing && existing.length > 0) {
        throw new Error("Email already registered");
      }
      
      const { data, error } = await supabase
        .from("admins")
        .insert([{
          email,
          password,
          role: "admin",
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      const { password: _, ...safeAdmin } = data;
      localStorage.setItem("admin", JSON.stringify(safeAdmin));
      
      return { success: true, data: safeAdmin };
    } catch (error) {
      return { success: false, error: handleSupabaseError(error) };
    }
  }

  logout() {
    localStorage.removeItem("admin");
    return { success: true };
  }

  isAuthenticated() {
    return !!localStorage.getItem("admin");
  }

  getCurrentAdmin() {
    const admin = localStorage.getItem("admin");
    return admin ? JSON.parse(admin) : null;
  }
}

export default new AuthService();