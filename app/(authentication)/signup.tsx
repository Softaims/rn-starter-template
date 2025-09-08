// SignUpScreen.tsx - Fixed version
import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Alert } from "react-native";

import PrimaryButton from "../../src/components/molecules/Buttons/PrimaryButton";
import CustomText from "../../src/components/atoms/CustomText/CustomText";
import RedirectItem from "../../src/components/molecules/RedirectItem/RedirectItem";
import Divider from "../../src/components/molecules/Divider/Divider";
import FormField from "../../src/components/molecules/FormField/FormField";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

import { useSignUpViewModel } from "../../src/viewModels/AuthenticationView/useSignUpViewModel";
import { useGoogleAuthViewModel } from "../../src/viewModels/AuthenticationView/useGoogleAuthViewModel";
import { useAppleAuthViewModel } from "../../src/viewModels/AuthenticationView/useAppleAuthViewModel";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const { form, onSubmit, isLoading, error, clearError, isSuccess, userEmail } =
    useSignUpViewModel();

  console.log("SignUpScreen - isSuccess:", isSuccess, "userEmail:", userEmail);

  const { signInWithGoogle, isLoading: googleLoading } =
    useGoogleAuthViewModel();
  const { signInWithApple } = useAppleAuthViewModel();

  const {
    control,
    formState: { errors },
  } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Sign Up Error",
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
        <View className="mb-4">
          <CustomText variant="heading" size="2xl" className="mb-4 text-center">
            Sign Up To Your Account
          </CustomText>
          <CustomText
            variant="default"
            color="secondary"
            align="center"
            className="mb-8"
          >
            Signup to your account by adding your account details.
          </CustomText>

          <View className="space-y-4">
            <FormField
              control={control}
              name="username"
              label="Username"
              placeholder="Enter Username"
              autoCapitalize="none"
              error={errors.username}
              leftIcon={<Icon name="person" size={20} color="#666" />}
            />

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
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              }
            />

            <FormField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter Password"
              secureTextEntry={!showConfirmPassword}
              error={errors.confirmPassword}
              leftIcon={<Icon name="lock" size={20} color="#666" />}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              }
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <PrimaryButton
          onPress={onSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Sign Up
        </PrimaryButton>

        {/* Divider */}
        <Divider text="or signup with" />

        {/* Social Login Options */}
        <View className="flex-col justify-center self-center mb-4">
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

        {/* Login Redirect */}
        <RedirectItem
          message="Already have an account? "
          actionLabel="Login"
          onPress={() => router.push("/(authentication)/login")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
