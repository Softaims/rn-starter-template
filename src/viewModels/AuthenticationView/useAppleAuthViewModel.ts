// src/viewModels/useAppleAuthViewModel.ts
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuth } from "../../hooks/useAuth";

export const useAppleAuthViewModel = () => {
  const { signInWithApple, isLoading, error } = useAuth();

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const userData = {
        username: credential.fullName
          ? `${credential.fullName.givenName || ""} ${credential.fullName.familyName || ""}`.trim()
          : "Name not provided",
        email: credential.email || "Email not provided",
        id: credential.user,
      };

      await signInWithApple(credential.identityToken,userData);
    } catch (e: any) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        console.log("Apple sign-in canceled");
      } else {
        console.error("Apple sign-in error:", e);
      }
    }
  };

  return {
    handleAppleSignIn,
    isLoading,
    error,
  };
};
