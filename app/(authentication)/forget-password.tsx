import { View, ScrollView, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PrimaryButton from "../../src/components/molecules/Buttons/PrimaryButton";
import CustomText from '../../src/components/atoms/CustomText/CustomText';
import RedirectItem from "../../src/components/molecules/RedirectItem/RedirectItem";
import FormField from "../../src/components/molecules/FormField/FormField";

import { useForgotPasswordViewModel } from "../../src/viewModels/AuthenticationView/useForgotPasswordViewModel";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const { form, handleSubmit, isLoading, error, isSuccess } = useForgotPasswordViewModel();
  const { control, formState: { errors }, getValues } = form;

  useEffect(() => {
    if (isSuccess) {
      const email = getValues('email');
      router.push('/(authentication)/reset-password?email=' + encodeURIComponent(email));
    }
  }, [isSuccess, router, getValues]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View className="items-center mb-8">
          <CustomText variant="heading" size="2xl" color="primary" className="mb-2">
            Forgot Password
          </CustomText>
          <CustomText variant="subtitle" size="lg" color="secondary" align="center">
            Enter your email to reset your password
          </CustomText>
        </View>

        {/* Form Section */}
        <View className="mb-6">
          <View className="space-y-4">
            <FormField
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Icon name="email" size={20} color="#666" />}
            />
          </View>

          {error && (
            <CustomText variant="default" size="sm" color="error" className="mt-2 text-center">
              {error}
            </CustomText>
          )}
        </View>

        {/* Submit Button */}
        <PrimaryButton
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Send Verification Code
        </PrimaryButton>

        {/* Back to Login Redirect */}
        <RedirectItem
          message="Remember your password? "
          actionLabel="Back to Login"
          onPress={() => router.push('/(authentication)/login')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;