import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "./src/stores/supabaseAuth.store";
import { ActivityIndicator, View } from "react-native";
import "./global.css";
import SignUpScreen from "./src/screens/Authentication/SignupScreen";
import LoginScreen from "./src/screens/Authentication/LoginScreen";
import ForgotPasswordScreen from "./src/screens/Authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "./src/screens/Authentication/ResetPasswordScreen";
import OTPScreen from "./src/screens/OTP/OTPScreen";
import Home from "./src/screens/Home/Home";


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      {/* add more protected routes here */}
    </Stack.Navigator>
  );
}

export default function App() {
  const { isAuthenticated, initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth(); // check session on app start
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
