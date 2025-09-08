// app/(otp)/_layout.tsx
import { Stack } from "expo-router";

export default function otpLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="otp" />
    </Stack>
  );
}
