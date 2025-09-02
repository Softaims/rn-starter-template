import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller } from "react-hook-form";
import CustomText from "../../components/atoms/CustomText/CustomText";
import Button from "../../components/atoms/Buttons/Button";
import TextInputField from "../../components/atoms/TextInputField/TextInputField";
import { useSignUpViewModel } from "../../viewModels/AuthenticationView/useSignUpViewModel";
import { FormField } from "../../components/molecules/FormField/FormField";
import { Divider } from "../../components/molecules/Divider/Divider";
import { RedirectItem } from "../../components/molecules/RedirectItem/RedirectItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppleSignInButton from "../../components/atoms/AppleSignInButton/AppleSignInButton";
import { useAppleAuthViewModel } from "../../viewModels/AuthenticationView/useAppleAuthViewModel";

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  console.log("sdssddsadsa"); // Disable console.log
   const { form, handleSubmit, isLoading, error, isSuccess, userEmail } = useSignUpViewModel();
  const { handleAppleSignIn, isLoading: isAppleLoading } =
    useAppleAuthViewModel();

  const {
    control,
    formState: { errors },
  } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   useEffect(() => {
    if (isSuccess && userEmail) {
      navigation.navigate("OTP" as never, { email: userEmail } as never);
    }
  }, [isSuccess, userEmail, navigation]);

   const onSubmit = (data: any) => {
    handleSubmit(data);
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
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mb-6"
          onPress={onSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Sign Up
        </Button>

        {/* Divider */}
        <Divider text="or signup with" />

        {/* Social Login Options */}
        <View className="flex-row justify-center mb-8">
          <AppleSignInButton size="md" onPress={handleAppleSignIn} />
        </View>

        {/* Login Redirect */}
        <RedirectItem
          message="Already have an account? "
          actionLabel="Login"
          onPress={() => navigation.navigate("Login" as never)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
