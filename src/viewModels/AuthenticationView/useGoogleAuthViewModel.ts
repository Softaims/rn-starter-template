// src/viewModels/useGoogleAuthViewModel.ts
import { useState, useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

export const useGoogleAuthViewModel = () => {
  const { setUser, setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "YOUR_WEB_CLIENT_ID",
      iosClientId: "YOUR_IOS_CLIENT_ID",
      offlineAccess: true,
      scopes: ["profile", "email"],
    });
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();

      if (!googleUser.idToken) {
        throw new Error("No ID token from Google");
      }

      const { data, error: supabaseError } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: googleUser.idToken,
      });

      if (supabaseError) throw supabaseError;

      setUser(data.user ?? null);
      setSession(data.session ?? null);

      return { success: true, user: data.user };
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) setError("Sign-in cancelled");
      else if (err.code === statusCodes.IN_PROGRESS) setError("Sign-in in progress");
      else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) setError("Play Services not available");
      else setError(err.message);

      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const signOutGoogle = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.signOut();
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWithGoogle, signOutGoogle, isLoading, error };
};
