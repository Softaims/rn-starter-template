// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestNavigation from "./src/screens/Authentication/tests/navigation";
import "./global.css";
import AuthArchitectureTest from "./src/screens/Authentication/tests/SignupTest";
import SignUpScreen from "./src/screens/Authentication/SignupScreen";
import LoginScreen from "./src/screens/Authentication/LoginScreen";
import ResetPasswordScreen from "./src/screens/Authentication/ResetPasswordScreen";
import ForgotPasswordScreen from "./src/screens/Authentication/ForgotPasswordScreen";
import OTPScreen from "./src/screens/OTP/OTPScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          // options={{ title: 'Testing Suite' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ title: 'Testing Suite' }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

        <Stack.Screen name="OTP" component={OTPScreen} />

        {/* <Stack.Screen
          name="TestNavigation"
          component={TestNavigation}
          options={{ title: 'Testing Suite' }}
        />
        <Stack.Screen
          name="AuthTest"
          component={AuthArchitectureTest}
          options={{ title: 'Auth Architecture Test' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
