import { useAuth } from "../../hooks/useAuth";

export const useLogoutViewModel = () => {
  const { user, isAuthenticated, isLoading, error, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    handleSignOut,
  };
};
