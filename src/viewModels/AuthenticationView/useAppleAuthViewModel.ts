// src/viewModels/useAppleAuthViewModel.ts
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuthStore } from "../../stores/supabaseAuth.store";

export const useAppleAuthViewModel = () => {
  const { signInWithSocial, isLoading, error } = useAuthStore();

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("Apple Credential:", credential);

      if (credential.identityToken) {
        console.log("Identity Token:", credential.identityToken);
        await signInWithSocial("apple", credential.identityToken , undefined);
      } else {
        throw new Error("No identity token received from Apple");
      }
    } catch (err: any) {
      if (err.code !== "ERR_CANCELED") {
        console.error("Apple Sign-In Error:", err);
      }
    }
  };

  return { signInWithApple, isLoading, error };
};
