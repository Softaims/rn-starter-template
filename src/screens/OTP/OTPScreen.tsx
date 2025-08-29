// src/screens/OTPScreen.tsx
import React, { useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomText from "../../components/atoms/CustomText/CustomText";
import Button from "../../components/atoms/Buttons/Button";
import { useOTPViewModel } from "../../viewModels/useOTPViewModel";
import { OTPInput } from "../../components/molecules/OTPInputGroup/OTPInput";
import { Divider } from "../../components/molecules/Divider/Divider";
import { RedirectItem } from "../../components/molecules/RedirectItem/RedirectItem";

const OTPScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email as string; // Assuming email is passed via route params

  const { form, handleSubmit, handleResend, isLoading, error } = useOTPViewModel(email);
  const {
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (error) {
      console.error("OTP verification error:", error);
    }
  }, [error]);

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

        {/* OTP Input Section */}
        <View className="mb-6">
          <OTPInput
            control={control}
            name="otp"
            length={6}
            error={errors.otp}
            onResend={handleResend}
            email={email}
          />
        </View>

        {/* Verify Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mb-6"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Verify
        </Button>

        {/* Divider */}
        <Divider text="Or" />

        {/* Back to Login Redirect */}
        <RedirectItem
          message="Back to "
          actionLabel="Login"
          onPress={() => navigation.navigate("Login" as never)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPScreen;