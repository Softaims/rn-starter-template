import React, { use, useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/atoms/CustomText/CustomText";
import Button from "../../components/atoms/Buttons/Button";
import { useLoginViewModel } from "../../viewModels/AuthenticationView/useLoginViewModel";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Divider } from "../../components/molecules/Divider/Divider";
import { RedirectItem } from "../../components/molecules/RedirectItem/RedirectItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppleAuthViewModel } from "../../viewModels/AuthenticationView/useAppleAuthViewModel";
import { useGoogleAuthViewModel } from "../../viewModels/AuthenticationView/useGoogleAuthViewModel";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { form, loginDirect, isLoading, error } = useLoginViewModel();
  const {
    control,
    formState: { errors },
  } = form;
   const { signInWithGoogle, isLoading: googleLoading } = useGoogleAuthViewModel();
  const { signInWithApple, isLoading: appleLoading } = useAppleAuthViewModel();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Login error:", error);
    }
  }, [error]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  /**
   * Handle login button click
   */
  const handleLogin = async () => {
    try {
      const values = form.getValues(); // { email, password }
      const result = await loginDirect(values);

      // if (result?.success) {
      //   navigation.navigate("Home" as never);
      // }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

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
          onPress={() => navigation.navigate("ForgotPassword" as never)}
          align="right"
          className="mb-6"
        />

        {/* Login Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mb-6"
          onPress={handleLogin}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>

        {/* Divider */}
        <Divider text="Or Login With" />

        {/* Social Login Options */}

        <View className="flex-row justify-center mb-8">
        <GoogleSigninButton
        onPress={signInWithGoogle}
        disabled={googleLoading}
      />

      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={signInWithApple}
        disabled={appleLoading}
      />
        </View>

        {/* Sign Up Redirect */}
        <RedirectItem
          message="Don't have an account? "
          actionLabel="Sign Up"
          onPress={() => navigation.navigate("SignUp" as never)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
