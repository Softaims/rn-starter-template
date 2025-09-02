// src/viewModels/useGoogleAuthViewModel.ts
import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

// Configuration interface for better type safety
interface GoogleSignInConfig {
  webClientId: string;
  iosClientId?: string;
  androidClientId?: string;
  offlineAccess: boolean;
  scopes: string[];
  hostedDomain?: string;
  forceCodeForRefreshToken?: boolean;
}

const webClientId = "1034133353106-ssnmqio1ciuo9s9mb9l03vh8qth5ah4l.apps.googleusercontent.com"
const iosClientId = "1034133353106-b2iq7gc68nulq1ifn080igj1jr3p9296.apps.googleusercontent.com"


export const useGoogleAuthViewModel = () => {
  const { setUser, setSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  // Configuration for both platforms
  const googleConfig: GoogleSignInConfig = {
    webClientId: webClientId, // Required for both platforms
    iosClientId: iosClientId, // iOS specific client ID
    offlineAccess: true,
    scopes: ["profile", "email"],
    // Optional: Add hosted domain if you want to restrict to specific domain
    // hostedDomain: "yourdomain.com",
    forceCodeForRefreshToken: true, // Helps with token refresh on both platforms
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    try {
      // Platform-specific configuration
      const config: any = {
        webClientId: googleConfig.webClientId,
        offlineAccess: googleConfig.offlineAccess,
        scopes: googleConfig.scopes,
        forceCodeForRefreshToken: googleConfig.forceCodeForRefreshToken,
      };

      // Add iOS specific configuration
      if (Platform.OS === 'ios' && googleConfig.iosClientId) {
        config.iosClientId = googleConfig.iosClientId;
      }

      // Add Android specific configuration if provided
      if (Platform.OS === 'android' && googleConfig.androidClientId) {
        config.androidClientId = googleConfig.androidClientId;
      }

      // Add hosted domain if specified
      if (googleConfig.hostedDomain) {
        config.hostedDomain = googleConfig.hostedDomain;
      }

      GoogleSignin.configure(config);
      setIsConfigured(true);
      
      console.log(`Google Sign-In configured for ${Platform.OS}`);
    } catch (err) {
      console.error("Failed to configure Google Sign-In:", err);
      setError("Failed to configure Google Sign-In");
    }
  };

  const checkPlayServices = async (): Promise<boolean> => {
    try {
      // Only check Play Services on Android
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      }
      return true;
    } catch (err: any) {
      console.error("Play Services check failed:", err);
      if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError("Google Play Services not available or outdated");
        return false;
      }
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    if (!isConfigured) {
      setError("Google Sign-In not configured");
      return { success: false, error: "Configuration error" };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check Play Services for Android
      const playServicesAvailable = await checkPlayServices();
      if (!playServicesAvailable) {
        return { success: false, error: "Play Services not available" };
      }

      // Check if user is already signed in
      const isSignedIn = await GoogleSignin.hasPreviousSignIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // Perform sign-in
      const googleUser = await GoogleSignin.signIn();

      // Validate the response
      if (!googleUser || !googleUser.idToken) {
        throw new Error("No ID token received from Google");
      }

      console.log("Google sign-in successful:", {
        platform: Platform.OS,
        userId: googleUser.user.id,
        email: googleUser.user.email,
      });

      // Sign in with Supabase using the Google ID token
      const { data, error: supabaseError } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: googleUser.idToken,
        access_token: googleUser.serverAuthCode || undefined,
      });

      if (supabaseError) {
        console.error("Supabase authentication error:", supabaseError);
        throw supabaseError;
      }

      if (!data.user || !data.session) {
        throw new Error("No user or session data from Supabase");
      }

      // Update auth state
      setUser(data.user);
      setSession(data.session);

      return { 
        success: true, 
        user: data.user,
        platform: Platform.OS 
      };

    } catch (err: any) {
      console.error("Google sign-in error:", err);
      
      let errorMessage = "Sign-in failed";
      
      // Handle specific error codes
      switch (err.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          errorMessage = "Sign-in was cancelled";
          break;
        case statusCodes.IN_PROGRESS:
          errorMessage = "Sign-in already in progress";
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          errorMessage = Platform.OS === 'android' 
            ? "Google Play Services not available" 
            : "Google Services not available";
          break;
        case statusCodes.SIGN_IN_REQUIRED:
          errorMessage = "Please sign in again";
          break;
        default:
          errorMessage = err.message || "Unknown error occurred";
      }

      setError(errorMessage);
      
      // Show platform-specific error handling
      if (Platform.OS === 'ios' && err.code === '-5') {
        Alert.alert(
          "Sign-in Error",
          "Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      }

      return { success: false, error: errorMessage, code: err.code };
    } finally {
      setIsLoading(false);
    }
  };

  const signOutGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if user is signed in before attempting sign out
      const isSignedIn = await GoogleSignin.hasPreviousSignIn();
      
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // Sign out from Supabase
      const { error: supabaseError } = await supabase.auth.signOut();
      if (supabaseError) {
        console.error("Supabase sign-out error:", supabaseError);
        throw supabaseError;
      }

      // Clear auth state
      setUser(null);
      setSession(null);

      console.log(`Google sign-out successful on ${Platform.OS}`);
      return { success: true };

    } catch (err: any) {
      console.error("Google sign-out error:", err);
      const errorMessage = err.message || "Sign-out failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser;
    } catch (err) {
      console.error("Failed to get current user:", err);
      return null;
    }
  };

  // const silentSignIn = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     return userInfo;
  //   } catch (err) {
  //     console.error("Silent sign-in failed:", err);
  //     return null;
  //   }
  // };

  // Helper function to check if Google Play Services are available (Android only)
  const isPlayServicesAvailable = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    
    try {
      await GoogleSignin.hasPlayServices();
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    // Core functions
    signInWithGoogle,
    signOutGoogle,
    
    // State
    isLoading,
    error,
    isConfigured,
    
    // Helper functions
    getCurrentUser,
    // silentSignIn,
    isPlayServicesAvailable,
    
    // Platform info
    platform: Platform.OS,
    
    // Clear error function
    clearError: () => setError(null),
  };
};