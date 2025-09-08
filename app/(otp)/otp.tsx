// app/(otp)/otp.tsx - Fixed version
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, ScrollView, SafeAreaView, Alert } from "react-native";
import CustomText from "../../src/components/atoms/CustomText/CustomText";
import OTPInput from "../../src/components/molecules/OTPInputGroup/OTPInput";
import Divider from "../../src/components/molecules/Divider/Divider";
import RedirectItem from "../../src/components/molecules/RedirectItem/RedirectItem";
import PrimaryButton from "../../src/components/molecules/Buttons/PrimaryButton";
import { useOTPViewModel } from "../../src/viewModels/AuthenticationView/useOTPViewModel";

const OTPScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  console.log("OTPScreen - received email param:", email);

  // Validate email parameter
  const emailString = typeof email === 'string' ? email : (Array.isArray(email) ? email[0] : '');
  
  console.log("OTPScreen - processed email:", emailString);

  const { form, verifyOtpDirect, handleResend, isLoading, error } =
    useOTPViewModel(emailString);

  const {
    control,
    formState: { errors },
  } = form;


  useEffect(() => {
    if (error) {
      console.error("OTP verification error:", error);
      Alert.alert(
        "Verification Error",
        error.message || "Failed to verify OTP. Please try again.",
        [{ text: "OK" }]
      );
    }
  }, [error]);

  const handleOTPVerification = async () => {
    if (!emailString) {
      Alert.alert("Error", "No email address available for verification.");
      return;
    }

    const values = form.getValues();
    console.log("Verifying OTP with email:", emailString, "and OTP:", values.otp);
    
    const result = await verifyOtpDirect(values);
    console.log("OTP verification result (screen):", result);

    if (result?.success) {
      router.replace("/(home)/");
    }
  };

  const handleResendOTP = async () => {
    if (!emailString) {
      Alert.alert("Error", "No email address available for resending OTP.");
      return;
    }

    const success = await handleResend();
    if (success) {
      Alert.alert("Success", "OTP has been resent to your email address.");
    }
  };

  // Show loading or error state if no email
  if (!emailString) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <CustomText variant="heading" size="lg" align="center" className="mb-4">
            Missing Email Address
          </CustomText>
          <CustomText variant="default" color="secondary" align="center" className="mb-6">
            No email address was provided for OTP verification.
          </CustomText>
          <PrimaryButton onPress={() => router.replace("/(authentication)/signup")}>
            Go Back to Sign Up
          </PrimaryButton>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingVertical: 24 }}>
        {/* Header */}
        <View className="items-center mb-8">
          <CustomText variant="heading" size="2xl" color="primary" className="mb-2">
            NourishWise
          </CustomText>
          <CustomText variant="subtitle" size="lg" color="secondary" align="center">
            Postpartum Meal Plan
          </CustomText>
        </View>

        {/* Email Display */}
        <View className="mb-6">
          <CustomText variant="heading" size="xl" className="mb-2 text-center">
            Verify Your Email
          </CustomText>
          <CustomText variant="default" color="secondary" align="center" className="mb-4">
            We've sent a verification code to:
          </CustomText>
          <CustomText variant="default" className="text-center font-semibold mb-6">
            {emailString}
          </CustomText>
        </View>

        {/* OTP Input */}
        <View className="mb-6">
          <OTPInput
            control={control}
            name="otp"
            length={6}
            error={errors.otp}
            onResend={handleResendOTP}
            email={emailString}
          />
        </View>

        <PrimaryButton 
          onPress={handleOTPVerification} 
          loading={isLoading} 
          disabled={isLoading || !emailString}
        >
          Verify
        </PrimaryButton>

        <Divider text="Or" />

        <RedirectItem
          message="Back to "
          actionLabel="Login"
          onPress={() => router.push("/(authentication)/login")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPScreen;