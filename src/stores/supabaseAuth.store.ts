// src/stores/auth.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/supabaseAuth.service";
// import { authService } from "../services/__mocks__/supabaseAuth.service";
import { AuthState, User } from "../types/auth.types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Initialize auth state from Supabase
      initializeAuth: async () => {
        try {
          set({ isLoading: true });
          const session = await authService.getSession();
          const isAuthenticated = !!session?.user;

          set({
            session,
            isLoading: false,
            isAuthenticated,
          });

          if (session?.user) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                username: session.user.user_metadata?.username || "",
              },
            });
          }
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      signUp: async (formData) => {
        set({ isLoading: true, error: null });

        try {
          console.log("Signing up with data:", formData);
          const response = await authService.signUp(formData);
          console.log("Sign up response:", response);
          if (response.success) {
            set({ isLoading: false });
          }

          return response;
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.signIn(email, password);
          set({ isLoading: false, isAuthenticated: true });
          return response;
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      signInWithSocial: async (provider, idToken, accessToken) => {
        try {
          set({ isLoading: true, error: null });
          const { data, error } = await authService.signInWithProvider(
            provider,
            idToken,
            accessToken
          );
          if (error) throw error;
          set({ user: data.user, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true });

        try {
          await authService.signOut();
          set({
            user: null,
            session: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,
          });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.forgotPassword(email);
          set({ isLoading: false });
          return response;
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      resetPassword: async (newPassword: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.resetPassword(newPassword);
          set({ isLoading: false });
          return response;
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      verifyOtp: async (email: string, token: string) => {
        set({ isLoading: true, error: null });
        console.log("Verifying OTP for email:", email, "with token:", token);

        try {
          const response = await authService.verifyOtp(email, token);
          set({ isLoading: false });
          return response;
        } catch (error: any) {
          console.error("Error in verifyOtp store:", error);
          set({ isLoading: false, error: error.message });
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setSession: (session: any) =>
        set({ session, isAuthenticated: !!session?.user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Set up auth state change listener
authService.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" && session?.user) {
    useAuthStore.getState().setSession(session);
    useAuthStore.getState().setUser({
      id: session.user.id,
      email: session.user.email!,
      username: session.user.user_metadata?.username || "",
    });
  } else if (event === "SIGNED_OUT") {
    useAuthStore.getState().setSession(null);
    useAuthStore.getState().setUser(null);
  }
});
