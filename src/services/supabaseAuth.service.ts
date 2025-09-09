// src/services/auth.service.ts
import { supabase } from "../../lib/supabaseClient";
import { SignUpFormData, AuthResponse } from "../types/auth.types";

export const authService = {
  signUp: async (formData: SignUpFormData) => {
    const { email, password, username } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "myapp://auth/verify",
        data: { username },
      },
    });

    console.log("[Supabase] signUp response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "SIGN_UP_ERROR",
        details: error,
      };
    }

    return { success: true, user: data.user };
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("[Supabase] signIn response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "SIGN_IN_ERROR",
        details: error,
      };
    }

    return {
      success: true,
      data: {
        userId: data.user?.id || "",
        email: data.user?.email || "",
      },
    };
  },

  signInWithProvider: async (provider: string, idToken: string, accessToken?: string) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider,
      token: idToken,
      access_token: accessToken,
    });

    console.log("[Supabase] signInWithProvider response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "SOCIAL_SIGN_IN_ERROR",
        details: error,
      };
    }

    return { success: true, data };
  },

  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    console.log("[Supabase] signOut", { error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "SIGN_OUT_ERROR",
        details: error,
      };
    }
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "myapp://reset-password",
    });

    console.log("[Supabase] forgotPassword", { error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "FORGOT_PASSWORD_ERROR",
        details: error,
      };
    }

    return { success: true, message: "Password reset email sent successfully" };
  },

  resetPassword: async (newPassword: string): Promise<AuthResponse> => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    console.log("[Supabase] resetPassword", { error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "RESET_PASSWORD_ERROR",
        details: error,
      };
    }

    return { success: true, message: "Password reset successfully" };
  },

  verifyOtp: async (email: string, token: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    console.log("[Supabase] verifyOtp response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "OTP_VERIFICATION_ERROR",
        details: error,
      };
    }

    return {
      success: true,
      data: {
        userId: data.user?.id || "",
        email: data.user?.email || "",
      },
    };
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("[Supabase] getSession response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "GET_SESSION_ERROR",
        details: error,
      };
    }

    return data.session;
  },

  getUser: async () => {
    // for effieciency, you might want to use cache (getClaims) 
    const { data, error } = await supabase.auth.getUser();
    console.log("[Supabase] getUser response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "GET_USER_ERROR",
        details: error,
      };
    }

    return data.user;
  },

  refreshSession: async () => {
    const { data, error } = await supabase.auth.refreshSession();
    console.log("[Supabase] refreshSession response:", { data, error });

    if (error) {
      throw {
        message: error.message,
        code: error.code || "REFRESH_SESSION_ERROR",
        details: error,
      };
    }

    return data.session;
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[Supabase] Auth state change:", { event, session });
      callback(event, session);
    });

    return listener;
  },
};
