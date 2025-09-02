import { useAuthStore } from '../stores/supabaseAuth.store';

export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    signUp: store.signUp,
    signIn: store.signIn,
    signInWithSocial: store.signInWithSocial,
    signOut: store.signOut,
    forgotPassword: store.forgotPassword,
    resetPassword : store.resetPassword,
    verifyOtp: store.verifyOtp,
    clearError: store.clearError,
    setUser: store.setUser,
    setSession: store.setSession,
  };
};