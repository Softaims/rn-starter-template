// src/viewModels/useGoogleAuthViewModel.ts
import { useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useAuthStore } from "../../stores/supabaseAuth.store";

const webClientId =
  "1034133353106-ssnmqio1ciuo9s9mb9l03vh8qth5ah4l.apps.googleusercontent.com";
const iosClientId =
  "1034133353106-b2iq7gc68nulq1ifn080igj1jr3p9296.apps.googleusercontent.com";

export const useGoogleAuthViewModel = () => {
  const { signInWithSocial, isLoading, error } = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:  webClientId,
      iosClientId: iosClientId,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      if (tokens.idToken) {
        await signInWithSocial("google", tokens.idToken, tokens.accessToken);
      } else {
        throw new Error("No ID token received from Google");
      }
    } catch (err: any) {
      if (err.code !== statusCodes.SIGN_IN_CANCELLED) {
        console.error("Google Sign-In Error:", err);
      }
    }
  };

  return { signInWithGoogle, isLoading, error };
};
