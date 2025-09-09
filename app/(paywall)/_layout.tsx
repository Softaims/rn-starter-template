
// app/(otp)/_layout.tsx
import { Stack } from "expo-router";

export default function paywallLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="paywall" />
    </Stack>
  );
}
