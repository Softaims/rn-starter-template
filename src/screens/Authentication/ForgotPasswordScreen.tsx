// src/screens/ForgotPasswordScreen.tsx
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/atoms/CustomText/CustomText';
import Button from '../../components/atoms/Buttons/Button';
import { RedirectItem } from '../../components/molecules/RedirectItem/RedirectItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormField } from '../../components/molecules/FormField/FormField';
import { useForgotPasswordViewModel } from '../../viewModels/AuthenticationView/useForgotPasswordViewModel';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const { form, handleSubmit, isLoading, error, isSuccess } = useForgotPasswordViewModel();
  const { control, formState: { errors }, getValues } = form;

  // Navigate to reset screen when successful
  useEffect(() => {
    if (isSuccess) {
      const email = getValues('email');
      navigation.navigate('ResetPassword', { email });
    }
  }, [isSuccess, navigation, getValues]);

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
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mb-6"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Send Verification Code
        </Button>

        {/* Back to Login Redirect */}
        <RedirectItem
          message="Remember your password? "
          actionLabel="Back to Login"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;