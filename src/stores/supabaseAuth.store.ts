// src/stores/auth.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/supabaseAuth.service";
import { AuthState, User } from "../types/auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      isVerified: false,
      needsVerification: false, // ✅ new flag

      // Initialize auth state
      initializeAuth: async () => {
        set({ isLoading: true });
        try {
          const session = await authService.getSession();
          console.log("Initial session:", session);

          if (session?.user) {
            // If Supabase gave us a session, user is logged in & verified
            set({
              session,
              user: {
                id: session.user.id,
                email: session.user.email!,
                username: session.user.user_metadata?.username || "",
              },
              isAuthenticated: true,
              isVerified: true,
              needsVerification: false,
              isLoading: false,
            });
          } else {
            // Check if a user exists but isn’t confirmed yet
            const { data: userData } = await authService.getUser();
            if (userData?.user) {
              set({
                user: {
                  id: userData.user.id,
                  email: userData.user.email!,
                  username: userData.user.user_metadata?.username || "",
                },
                isAuthenticated: false,
                isVerified: false,
                needsVerification: true, // user exists but needs OTP
                isLoading: false,
              });
            } else {
              set({
                session: null,
                user: null,
                isAuthenticated: false,
                isVerified: false,
                needsVerification: false,
                isLoading: false,
              });
            }
          }
        } catch (err: any) {
          set({
            isLoading: false,
            error: {
              message: err.message || "Failed to initialize authentication",
              code: err.code || "INIT_AUTH_ERROR",
              details: err,
            },
          });
        }
      },

      signUp: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.signUp(formData);
          console.log("Sign up response store:", response);
          // Supabase returns session=null here
          set({
            isLoading: false,
            isAuthenticated: false,
            isVerified: false,
            needsVerification: true, // ✅ after signUp, OTP required
          });
          return response;
        } catch (err: any) {
          const error = {
            message: err.message || "Sign up failed",
            code: err.code || "SIGN_UP_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.signIn(email, password);
          console.log("Sign in response store:", response);
          set({
            isLoading: false,
            isAuthenticated: true,
            isVerified: true,
            needsVerification: false,
          });
          return response;
        } catch (err: any) {
          const error = {
            message: err.message || "Sign in failed",
            code: err.code || "SIGN_IN_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
        }
      },

      signInWithSocial: async (provider, idToken, accessToken) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error: socialError } =
            await authService.signInWithProvider(
              provider,
              idToken,
              accessToken
            );
          if (socialError) throw socialError;
          set({
            user: data.user,
            isLoading: false,
            isAuthenticated: true,
            isVerified: true,
            needsVerification: false,
          });
        } catch (err: any) {
          const error = {
            message: err.message || "Social sign in failed",
            code: err.code || "SOCIAL_SIGN_IN_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
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
            isVerified: false,
            needsVerification: false,
          });
        } catch (err: any) {
          const error = {
            message: err.message || "Sign out failed",
            code: err.code || "SIGN_OUT_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.forgotPassword(email);
          set({ isLoading: false });
          return response;
        } catch (err: any) {
          const error = {
            message: err.message || "Password reset failed",
            code: err.code || "FORGOT_PASSWORD_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
        }
      },

      resetPassword: async (newPassword) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.resetPassword(newPassword);
          set({ isLoading: false });
          return response;
        } catch (err: any) {
          const error = {
            message: err.message || "Password reset failed",
            code: err.code || "RESET_PASSWORD_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
        }
      },

      verifyOtp: async (email, token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.verifyOtp(email, token);
          set({
            isLoading: false,
            isAuthenticated: true,
            isVerified: true,
            needsVerification: false, // ✅ cleared after OTP
            user: {
              id: response.data?.userId,
              email: response.data?.email,
              username: "",
            },
          });
          return response;
        } catch (err: any) {
          const error = {
            message: err.message || "OTP verification failed",
            code: err.code || "OTP_VERIFICATION_ERROR",
            details: err,
          };
          set({ isLoading: false, error });
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
          isVerified: !!user,
          needsVerification: false,
        }),
      setSession: (session: any) =>
        set({
          session,
          isAuthenticated: !!session?.user,
          isVerified: !!session?.user,
          needsVerification: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
        needsVerification: state.needsVerification,
      }),
    }
  )
);

// Auth state listener
authService.onAuthStateChange((event, session) => {
  const store = useAuthStore.getState();

  switch (event) {
    case "SIGNED_IN":
      if (session?.user) {
        store.setSession(session);
        store.setUser({
          id: session.user.id,
          email: session.user.email!,
          username: session.user.user_metadata?.username || "",
        });
      }
      break;

    case "SIGNED_OUT":
      store.setSession(null);
      store.setUser(null);
      break;

    case "TOKEN_REFRESHED":
      console.log("🔄 Session token refreshed");
      store.setSession(session);
      break;

    case "USER_UPDATED":
      console.log("👤 User updated:", session?.user);
      if (session?.user) store.setUser(session.user);
      break;

    case "PASSWORD_RECOVERY":
      console.log("🔐 Password recovery flow started");
      break;

    case "MFA_CHALLENGE_VERIFIED":
      console.log("✅ MFA challenge passed");
      break;
  }
});
