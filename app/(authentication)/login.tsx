import { View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../../src/components/molecules/Buttons/PrimaryButton";
import CustomText from '../../src/components/atoms/CustomText/CustomText';
import RedirectItem from '../../src/components/molecules/RedirectItem/RedirectItem';
import Divider from "../../src/components/molecules/Divider/Divider";
import FormField from '../../src/components/molecules/FormField/FormField';
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

import { useLoginViewModel } from "../../src/viewModels/AuthenticationView/useLoginViewModel";
import { useGoogleAuthViewModel } from "../../src/viewModels/AuthenticationView/useGoogleAuthViewModel";
import { useAppleAuthViewModel } from "../../src/viewModels/AuthenticationView/useAppleAuthViewModel";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";


const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { form, loginDirect, isLoading, error ,clearError } = useLoginViewModel();
  const {
    control,
    formState: { errors },
  } = form;
  const { signInWithGoogle, isLoading: googleLoading } =
    useGoogleAuthViewModel();
  const { signInWithApple, isLoading: appleLoading } = useAppleAuthViewModel();

  const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
    if (error) {
      Alert.alert(
        "Login Error",
        error.message || "Something went wrong. Please try again.",
        [
          {
            text: "OK",
            onPress: () => clearError(),
          },
        ]
      );
    }
  }, [error, clearError]);


  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = form.handleSubmit(async (values) => {
  try {
    const result = await loginDirect(values);
    if (!result) {
      console.log("Login failed");
    }
  } catch (err) {
    console.error("Login failed:", err);
  }
});


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View className="items-center mb-8">
          <CustomText
            variant="heading"
            size="2xl"
            color="primary"
            className="mb-2"
          >
            NourishWise
          </CustomText>
          <CustomText
            variant="subtitle"
            size="lg"
            color="secondary"
            align="center"
          >
            Postpartum Meal Plan
          </CustomText>
        </View>

        {/* Form Section */}
        <View className="mb-6">
          <CustomText variant="heading" size="2xl" className="mb-4 text-center">
            Login To Your Account
          </CustomText>
          <CustomText
            variant="default"
            color="secondary"
            align="center"
            className="mb-8"
          >
            Login to your account by adding your credentials.
          </CustomText>

          <FormField
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter Email Address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Icon name="email" size={20} color="#666" />}
          />

          <FormField
            control={control}
            name="password"
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            error={errors.password}
            leftIcon={<Icon name="lock" size={20} color="#666" />}
            rightIcon={
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            }
          />
        </View>

        {/* Forgot Password Redirect */}
        <RedirectItem
          message=""
          actionLabel="Forgot Password?"
          onPress={() => router.push("/(authentication)/forget-password")}
          align="right"
          className="mb-6"
        />

        {/* Login Button */}
        <PrimaryButton
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </PrimaryButton>

        {/* Divider */}
        <Divider text="Or Login With" />

        {/* Social Login Options */}

        <View className="flex-col self-center justify-center mb-8">
          <GoogleSigninButton
            onPress={signInWithGoogle}
            disabled={googleLoading}
          />

          <View className="my-1" />

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={{ width: 200, height: 44 }}
            onPress={signInWithApple}
          />
        </View>

        {/* Sign Up Redirect */}
        <RedirectItem
          message="Don't have an account? "
          actionLabel="Sign Up"
          onPress={() => router.push("/(authentication)/signup")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
