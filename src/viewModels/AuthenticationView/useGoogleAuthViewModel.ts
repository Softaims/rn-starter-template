// src/viewModels/useGoogleAuthViewModel.ts
import { useEffect } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useAuthStore } from "../../stores/supabaseAuth.store";

const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_KEY 
const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_KEY

console.log("Web Client ID:", webClientId);
console.log("iOS Client ID:", iosClientId);

export const useGoogleAuthViewModel = () => {
  const { signInWithSocial, isLoading, error } = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
      iosClientId: iosClientId,
    });
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      if (tokens.idToken) {
        await signInWithSocial("google", tokens.idToken, tokens.accessToken);
        return true; // Success
      } else {
        throw new Error("No ID token received from Google");
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
        return false;
      } else {
        console.error("Google Sign-In Error:", err);
        throw err; // Re-throw other errors
      }
    }
  };

  return { signInWithGoogle, isLoading, error };
};