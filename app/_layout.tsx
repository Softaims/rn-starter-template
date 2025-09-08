// app/_layout.tsx
import { ActivityIndicator } from "react-native";
import { Stack } from "expo-router";

import { useEffect } from "react";
import { useAuthStore } from "../src/stores/supabaseAuth.store";

export default function RootLayout() {
  const {
    isAuthenticated,
    isVerified,
    needsVerification,
    initializeAuth,
    isLoading,
  } = useAuthStore();

  console.log(
    "RootLayout - isAuthenticated:",
    isAuthenticated,
    "isVerified:",
    isVerified,
    "isLoading:",
    isLoading
  );

  useEffect(() => {
    initializeAuth(); // check token/session at startup
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated && isVerified ? (
        <Stack.Screen name="(home)" />
      ) : needsVerification ? (
        <Stack.Screen name="(otp)" />
      ) : (
        <Stack.Screen name="(authentication)" />
      )}
    </Stack>
  );
}
